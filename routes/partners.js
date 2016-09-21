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

  console.log(JSON.stringify(result));
  res.send(JSON.stringify(result));
});

/**
 * 合作伙伴新增
 */
router.post('/addPartner',function(req,res,next){
   //partnerdb.insertDocument();
   dbUtil.addDocument('parteners',[{a:89}]);
});


module.exports = router;
