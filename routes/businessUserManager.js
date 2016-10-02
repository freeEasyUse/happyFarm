var express = require('express');
var router = express.Router();
var mongooseUtil = require('../database/mongooseUtil');
var mongoose = require('mongoose');
var BUser = require('../database/entity/bUser');
var Field = require('../database/entity/fieldEntity');

/* GET users listing. */
router.get('/', function(req, res, next) {
  
});



/**
 * 查询当前可以分配给用户的地块
 */
router.get('/getAbleField',function(req,res,next){
    mongooseUtil.executeQuery(Field,{fieldStatus:'1'},res);
});


/**
 * 返回当前用户信息
 */
router.get('/getUserInfo',function(req,res,next){
  res.send(JSON.stringify(req.session.user));
});



module.exports = router;
