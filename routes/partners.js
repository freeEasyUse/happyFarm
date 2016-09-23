var express = require('express');
var router = express.Router();
var common = require('../common/common');
//var partnerdb = require('../database/partnerdb');
var dbUtil = require('../database/dbUtil');

/* 合作伙伴查询 */
router.get('/', function(req, res, next) {
  //判断是否有查询条件
  var objTime = new Object();
  var strObje = new Object();
  var searchOtion = new Object();
  if(req.query.isSearch){
    //开始时间
    if(req.query.startTime){
      var qstartTime = new Date(req.query.startTime);
      objTime.$gte = qstartTime;
    }
    //结束时间
    if(req.query.startTime){
      var endTime = new Date(req.query.endTime);
      endTime.setDate(endTime.getDate()+1);
      objTime.$lt = endTime;
    }
    //编码
    if(req.query.partnerCode){
      strObje.$regex = req.query.partnerCode;
      strObje.$options = 'i';
    }

    //判断是否为空
    if(!common.isEmptyObject(objTime)){
      searchOtion.partnerCreateTime = objTime;
    }
    if(!common.isEmptyObject(strObje)){
      searchOtion.partnerCode = strObje;
    }
  }
  searchOtion.status = 1;
  dbUtil.queryDocument('parteners',searchOtion,res);
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
