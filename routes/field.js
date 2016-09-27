var express = require('express');
var router = express.Router();
var common = require('../common/common');
var dbUtil = require('../database/dbUtil');

/**
 * 商家 地块管理
 */


//商家 所属地块查询  查询
router.get('/', function(req, res, next) {
  //判断是否有查询条件
  var objTime = new Object();
  var strObje = new Object();
  var searchOtion = new Object();
  if(req.query.isSearch){
    //地块创建开始时间
    if(req.query.startTime){
      var qstartTime = new Date(req.query.startTime);
      objTime.$gte = qstartTime;
    }
    //地块创建结束时间
    if(req.query.endTime){
      var endTime = new Date(req.query.endTime);
      endTime.setDate(endTime.getDate()+1);
      objTime.$lt = endTime;
    }
    //地块编码
    if(req.query.fieldCode){
      strObje.$regex = req.query.fieldCode;
      strObje.$options = 'i';
    }

    //判断是否为空
    if(!common.isEmptyObject(objTime)){
      searchOtion.fieldCreateTime = objTime;
    }
    if(!common.isEmptyObject(strObje)){
      searchOtion.fieldCode = strObje;
    }
  }
  searchOtion.status = 1;
  dbUtil.queryDocument('fields',searchOtion,res);
});



module.exports = router;
