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




module.exports = common;