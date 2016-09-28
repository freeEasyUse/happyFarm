var express = require('express');
var router = express.Router();

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
 * 管理人员登录
 */
router.post('/manager/login',function(){
    //判断登录类型 是合作商 和 平台人员
})




/**
 * 用户退出
 */

router.get('/logout',function(req,res,next) {
   //清空session
   req.session.user = null;
   return res.redirect('/');
});

module.exports = router;
