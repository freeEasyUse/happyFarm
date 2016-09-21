/**
 * 数据库操作工具类
 */
//申明返回对象
var dbUtil = new Object();

var Server = require('mongodb').Server; 
var Db = require('mongodb').Db;
var server = new Server('localhost', 27017,{auto_reconnect:true, native_parser: true});
var db = new Db('happyFarm',server);

/**
 * 新增
 */
dbUtil.addDocument = function(collectionName,insertObject){

    var collection = db.collection(collectionName,null,function(err,collection){
        console.log(err);
        console.log(collection);
    });
    collection.insertMany(insertObject,function(err, ids){
        console.log(err);
        console.log(ids);
        console.log('insert');
    })
}


module.exports = dbUtil;