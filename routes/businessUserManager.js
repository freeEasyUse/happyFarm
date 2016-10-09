var express = require('express');
var router = express.Router();
var mongooseUtil = require('../database/mongooseUtil');
var mongoose = require('mongoose');
var BUser = require('../database/entity/bUser');
var Field = require('../database/entity/fieldEntity');
var common = require('../common/common');

/*查询 当前用户*/
router.get('/', function(req, res, next) {
    var queryObject = new Object();
    queryObject.buserState = common.state_able;
    mongooseUtil.executeQuery(BUser,queryObject,res);
});


/**
 * 新增
 */
router.post('/addBusinessUser',function(req,res,next){
      //设置时间
      req.body.buserCreateDate = new Date(req.body.buserCreateDate);
      req.body.buserUpdateDate = new Date(req.body.buserUpdateDate);
      req.body.buserFieldStartDate = new Date(req.body.buserFieldStartDate);
      req.body.buserFieldEndDate = new Date(req.body.buserFieldEndDate);
      req.body.buserState = common.state_able;
      var bUser = new BUser(req.body);
      mongooseUtil.commitTwoStep(bUser,Field,res);
})


/**
 * 修改
 */
router.post('/updateBusinessUser',function(req,res,next){
      req.body.buserCreateDate = new Date(req.body.buserCreateDate);
      req.body.buserUpdateDate = new Date();
      req.body.buserFieldStartDate = new Date(req.body.buserFieldStartDate);
      req.body.buserFieldEndDate = new Date(req.body.buserFieldEndDate);
      //req.body.buserState = common.state_able;
      var bUser = new BUser(req.body);
      mongooseUtil.commitTwoStepUpdate(bUser,BUser,Field,req.body,res);
})



/**
 * 删除
 */
router.post('/deleteBuser',function(req,res,next){
    var arr = (req.body.arrStr).split(',');
    mongooseUtil.commitTwoDelete(BUser,Field,arr,res);
});



/**
 * 查询当前可以分配给用户的地块
 */
router.get('/getAbleField',function(req,res,next){
    mongooseUtil.executeQuery(Field,{fieldStatus:common.state_free},res);
});


/**
 * 返回当前用户信息
 */
router.get('/getUserInfo',function(req,res,next){
  res.send(JSON.stringify(req.session.user));
});



module.exports = router;
