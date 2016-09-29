var express = require('express');
var router = express.Router();
var dbUtil = require('../database/dbUtil');

/* 用户登录 */
router.post('/login', function(req, res, next) {
    var user={
        username: 'admin',
        password: 'admin'
    }
    var result = new Object();
    console.log(req.body.username);
    if(req.body.username === user.username && req.body.password === user.password){
       req.session.user = user;
       result.status = "Success";
    }
    else{
      result.status = "ERROR";
    }
    res.send(JSON.stringify(result));
});


/**
 * 平台管理人员登录
 */
router.post('/managerLogin', function(req, res, next) {

    var obj = req.body;
    //登录为平台
    if(obj.managerType==='p'){
        var user={
            username: 'admin',
            password: 'admin'
        }
        var result = new Object();
        console.log(req.body.username);
        if(req.body.username === user.username && req.body.password === user.password){
        req.session.user = user;
        result.status = "Success";
        }
        else{
        result.status = "ERROR";
        }
        res.send(JSON.stringify(result));
    }
    //登录为商家
    else{
        var searchOtion = new Object();
        searchOtion.partnerPassword = obj.password;
        searchOtion.partnerCode = obj.username;
        dbUtil.loginQuery('parteners',searchOtion,req,res,'partnerCode','partnerName');
    }
});






/**
 * 用户退出
 */

router.get('/logout',function(req,res,next) {
   //清空session
   req.session.user = null;
   return res.redirect('/');
});

module.exports = router;
