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
 * 商家用户 两阶段提交
 */
mongooseHelp.commitTwoStep = function(entity,model,res){
    //设置事务记录
    var transactionEntity  = new TransactionEntity({source:'buser',destination:'field',value:entity.buserFieldCode,state:'initial'});
    entity.save(function(error,reocrd){
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


module.exports = mongooseHelp;