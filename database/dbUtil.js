/**
 * 数据库操作工具类
 */
//申明返回对象
var dbUtil = new Object();
var mongo = require('mongodb');

var Db = mongo.Db;
var Connection = mongo.Connection;
var Server = mongo.Server; 

var db = new Db('happyFarm',new Server('localhost',27017),{safe:true});

/**
 * 新增
 * collectionName collection 名
 * insertObject 新增数组
 * res response
 */
dbUtil.addDocument = function(collectionName,insertObject,res){
    db.open(function(error,dbConection){
        if(error){
            console.log('has error');
        }
        else{
            dbConection.collection(collectionName).insertMany(insertObject,function(error,item){
                var result = new Object();
                if(error){
                    console.log('error in insertMany');
                     result.state = 'error';
                };
                result.state = 'success';
                db.close();
                res.send(JSON.stringify(result));
            });
        }
    });
}


/**
 * 根据条件查询
 * collectionName 连接名
 * queryObject 查询条件
 * res response
 */
dbUtil.queryDocument = function(collectionName,queryObject,res){
     db.open(function(error,dbConection){
       if(error){
            console.log('has error');
        }
        else{
            dbConection.collection(collectionName).find(queryObject).toArray(function(error,doc){
                if(error){
                    console.log('query error');
                }
                else{
                    //返回查询数据
                    res.send(JSON.stringify(doc));
                }
                db.close();
            });
        }
     });
}




/**
 * 登录查询
 */
dbUtil.loginQuery = function(collectionName,queryObject,req,res,code,name){
     db.open(function(error,dbConection){
       if(error){
            console.log('has error');
        }
        else{
            dbConection.collection(collectionName).findOne(queryObject,function(error,doc){
                var result = new Object();
                if(error){
                    console.log('query error');
                    result.status = 'error';
                }
                else{
                   if(doc){
                       var userSession = new Object();
                       userSession.userCode  = doc[code];
                       userSession.userName = doc[name];
                       req.session.user = userSession;
                       result.status = "Success";
                   }
                   else{
                        result.status = 'error';
                   }
                }
                res.send(JSON.stringify(result));
                db.close();
            });
        }
     });
}




/**
 * 修改记录
 * collectionName 连接名
 * queryObject 查询条件
 * setObject 修改内容
 * res response
 */
dbUtil.updateDocument = function(collectionName,queryObject,setObject,res){
     db.open(function(error,dbConection){
       if(error){
            console.log('has error');
        }
        else{
            dbConection.collection(collectionName).updateMany(queryObject,{$set:setObject},function(message){
                var result = new Object();
                if(message){
                     result.state = 'error';
                }
                else{
                    result.state = 'success';
                }
                db.close();
                res.send(JSON.stringify(result));
            });;
        }
     });
}








module.exports = dbUtil;