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
       result.status = "Success";
    }
    else{
      result.status = "ERROR";
    }
    res.send(JSON.stringify(result));
});

module.exports = router;
