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
 */
dbUtil.addDocument = function(collectionName,insertObject){

    db.open(function(error,dbConection){
        if(error){
            console.log('has error');
        }
        else{
            console.log('db status'+db._state);
            dbConection.collection(collectionName).insertMany(insertObject,function(error,item){
                if(error){
                    console.log('error in insertMany');
                }
                console.log('insert success');
            });
        }
    });
    
}


module.exports = dbUtil;