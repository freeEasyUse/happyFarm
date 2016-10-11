/**
 * mongoose 帮助类
 */
var mongooseHelp = new Object();
var mongoose = require('mongoose');
var TransactionEntity = require('../database/entity/transcationEntity.js');
var common = require('../common/common');
mongoose.connect('mongodb://localhost/happyFarm');

/**
 * 使用mongoose 添加记录
 */
mongooseHelp.executeSave = function(entity,res){
    entity.save(function(err){
        var result = new Object();
        if(err){
           result.state = 'error';
        }
        else{
          result.state = 'success';
        }
        res.send(JSON.stringify(result));
    });
}



/**
 * 使用mongoose 查询记录
 */
mongooseHelp.executeQuery = function(model,queryObject,res){
    model.find(queryObject,function(err,docs){
        if(err){
            console.log('query error');
        }
        else{
            //返回查询数据
            res.send(JSON.stringify(docs));
        }
    });
}

/**
 * 使用mongoose 修改记录
 */
mongooseHelp.executeUpdate = function(model,queryObject,updateOption,res){
    model.update(queryObject,updateOption,function(err){
        var result = new Object();
        if(err){
            result.state = 'error';
            console.log('update error');
        }
        else{
            result.state = 'success';
        }
        res.send(JSON.stringify(result));
    })
}



/**
 * 商家用户 两阶段提交 新增
 */
mongooseHelp.commitTwoStep = function(entity,model,res){
    //设置事务记录
    var transactionEntity  = new TransactionEntity({source:'buser',destination:'field',value:entity.buserFieldCode,state:'initial'});
    transactionEntity.save(function(error,reocrd){
        //保存事务后 查询记录 
            //修改事务状态
            TransactionEntity.update({state:'initial'},{$set:{state:'pending'}},function(err){
                //新增商家用户
                entity.save(function(){
                    //修改地块信息
                    var queryObject = new Object();
                    queryObject.fieldCode = entity.buserFieldCode;
                    var setObject = new Object();
                    setObject.fieldStatus = common.state_in_use;
                    setObject.fieldUserCode = entity.buserPhone;
                    setObject.fieldUserName = entity.buserName;
                    setObject.fieldUpdateTime = new Date();
                    model.update(queryObject,{$set:setObject},function(err){
                        var result = new Object();
                        if(err){
                            result.state = 'error';
                            console.log('update error');
                        }
                        else{
                            result.state = 'success';
                        }
                        res.send(JSON.stringify(result));
                    });
                });
            });
    });
}



/**
 * 商家用户 两阶段提交 修改
 */
mongooseHelp.commitTwoStepUpdate = function(entity,userModel,fileModel,setObject,res){
      var transactionEntity  = new TransactionEntity({source:'buser',destination:'field',value:entity.buserFieldCode,state:'initial'});
      transactionEntity.save(function(error,reocrd){
        TransactionEntity.update({state:'initial'},{$set:{state:'pending'}},function(err){
            //查询原来商家用户信息
            userModel.findOne({buserCardNumber:entity.buserCardNumber},function(err, doc){
                //修改商家用户信息
                userModel.update({buserCardNumber:entity.buserCardNumber},{$set:setObject},function(err,raw){
                    if(err){
                        return;
                    }
                    //释放原来的地块
                    fileModel.update({fieldCode:doc.buserFieldCode},{$set:{fieldStatus:common.state_free,fieldUserCode:"",fieldUserName:"",fieldUpdateTime:new Date()}},function(){
                        //修改当前选中记录
                        fileModel.update({fieldCode:entity.buserFieldCode},{$set:{fieldStatus:common.state_in_use,fieldUserCode:entity.buserPhone,fieldUserName:entity.buserName,fieldUpdateTime:new Date()}},function(err){
                            var result = new Object();
                            if(err){
                                result.state = 'error';
                                console.log('update error');
                            }
                            else{
                                result.state = 'success';
                            }
                            res.send(JSON.stringify(result));
                        });
                    })
                });
            });
        });
      });
}



/**
 * 两阶段提交 删除
 */
mongooseHelp.commitTwoDelete = function(userModel,fileModel,arr,res){
      var transactionEntity  = new TransactionEntity({source:'buser',destination:'field',value:arr,state:'initial'});
      transactionEntity.save(function(error,reocrd){
        TransactionEntity.update({state:'initial'},{$set:{state:'pending'}},function(err){
            //查询原来商家用户信息
            userModel.find({buserCardNumber:{$in:arr}},function(err, docs){
                for(var i = 0;i<docs.length;i++){
                    var doc = docs[i];
                    //设置商家用户状态
                    userModel.update({buserCardNumber:doc.buserCardNumber},{$set:{buserState:common.state_unable}},function(){
                        //释放地块
                        fileModel.update({fieldCode:doc.buserFieldCode},{$set:{fieldStatus:common.state_free,fieldUserCode:"",fieldUserName:"",fieldUpdateTime:new Date()}},function(err){
                            var result = new Object();
                            if(err){
                                result.state = 'error';
                                console.log('update error');
                            }
                            else{
                                result.state = 'success';
                            }
                            res.send(JSON.stringify(result));
                        });
                    });
                }
            });
        });
      });
}


//定时 清理  到期商家用户
mongooseHelp.clearTimeEndUser = function(userModel,fieldModel){
    console.log("定时清理 到期商家用户 开始");
    //查询到期用户
    userModel.find({buserFieldEndDate:{$gt:new Date()},buserState:common.state_able},function(err,docs){
        if(err||docs.length===0){
            console.log('没有到期用户');
            return;
        }
        else{
            for(var i = 0;i<docs.length;i++){
                var tobj = docs[i];
                //到期用户 修改状态
                userModel.update({buserCardNumber:tobj.buserCardNumber},{$set:{buserState:common.state_unable}},function(err){
                    //修改地块状态
                    console.log(tobj);
                    fieldModel.update({fieldCode:tobj.buserFieldCode},{$set:{fieldStatus:common.state_free,fieldUserCode:"",fieldUserName:"",fieldUpdateTime:new Date()}},function(err){
                        console.log('timer success');
                    });
                })
            }
        }

    });
}

module.exports = mongooseHelp;