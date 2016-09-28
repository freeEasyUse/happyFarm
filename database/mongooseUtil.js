/**
 * mongoose 帮助类
 */
var mongooseHelp = new Object();
var mongoose = require('mongoose');
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


module.exports = mongooseHelp;