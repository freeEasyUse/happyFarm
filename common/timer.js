/**
 * 定时任务
 */
var schedule = require("node-schedule");

var timer = new Object();

/**
 * 定时任务测试
 */
timer.test1 = function(){
    schedule.scheduleJob('* * * * * *', function(){
    console.log('The answer to life, the universe, and everything!');
});
}


/**
 * 查询到期租赁关系 每天 23 时 执行
 */
timer.timeUpField = function(){

}


module.exports = timer;