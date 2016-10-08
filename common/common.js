var Settings = require('../database/settings');
var common = new Object();
/**
 * 判断是否登录
 */
common.authentication = function(req, res) {
    if (!req.session.user) {
        return res.redirect('/');
    }
}



/**
 * 判断object 是否为空
 */
common.isEmptyObject = function(obj){
    var hasProp = true;
    for (var prop in obj){  
        hasProp = false;  
        break;  
    }
    return hasProp;
}

/**
 * 设置地块状态
 */
common.state_free = 0;  //可用状态
common.state_in_use = 1;  //在用状态
common.state_no_use = 2;  //废弃状态

/**
 * 一般状态
 */
common.state_able = 1;  //有效
common.state_unable = 0;   //无效


module.exports = common;