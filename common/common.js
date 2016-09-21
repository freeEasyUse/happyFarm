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
module.exports = common;