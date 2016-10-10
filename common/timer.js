/**
 * 定时任务
 */
var schedule = require("node-schedule");

var timer = new Object();

timer.test1 = function(){
    schedule.scheduleJob('* * * * * *', function(){
    console.log('The answer to life, the universe, and everything!');
});
}


module.exports = timer;