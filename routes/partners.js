var express = require('express');
var router = express.Router();
var common = require('../common/common');
//var partnerdb = require('../database/partnerdb');
var dbUtil = require('../database/dbUtil');

/* 合作伙伴查询 */
router.get('/', function(req, res, next) {
  var result = new Array();
  for(var i = 0; i<100;i++){
    var obj = new Object();
    obj.id = i+1;
    obj.name = i+'name';
    obj.price = i+100;
    result.push(obj);
  }
  dbUtil.queryDocument('parteners',{status:1},res);
});

/**
 * 合作伙伴新增
 */
router.post('/addPartner',function(req,res,next){
    //partnerdb.insertDocument();
    //设置合作伙伴状态
    req.body.status = 1;
    dbUtil.addDocument('parteners',[req.body],res);
});


/**
 * 修改伙伴信息
 */
router.post('/updatePartner',function(req,res,next){
    var queryObject = new Object();
    queryObject.partnerCode = req.body.partnerCode;
    dbUtil.updateDocument('parteners',queryObject,req.body,res);
});

/**
 * 删除合作伙伴
 */
router.post('/deletePartner',function(req,res,next){
      var setObject = new Object();
      setObject.status = 0;
      var arr = (req.body.arrStr).split(',');
      dbUtil.updateDocument('parteners',{partnerCode:{$in:arr}},setObject,res);
});



module.exports = router;
