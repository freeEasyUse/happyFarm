var express = require('express');
var router = express.Router();
var common = require('../common/common');
var mongooseUtil = require('../database/mongooseUtil');
var mongoose = require('mongoose');
var Field = require('../database/entity/fieldEntity');
var formidable = require('formidable');
var xlsx = require("node-xlsx");
var fs = require('fs');

/**
 * 商家 地块管理
 */
//商家 所属地块查询  查询
router.get('/', function(req, res, next) {
  mongooseUtil.executeQuery(Field,{fieldStatus:{$ne:common.state_no_use}},res)
});



/**
 * 商家地块新增
 */
router.post('/addField',function(req,res,next){
    //partnerdb.insertDocument();
    //设置时间
    req.body.fieldCreateTime = new Date(req.body.fieldCreateTime);
    req.body.fieldUpdateTime = new Date(req.body.fieldUpdateTime);
    var fieldEntity = new Field(req.body);
    mongooseUtil.executeSave(fieldEntity,res);
});



/**
 * 地块修改
 */
router.post('/updateField',function(req,res,next){
    //获取查询值
    var queryObject = new Object();
    queryObject.fieldCode = req.body.fieldCode;
    //时间设置
    req.body.fieldCreateTime = new Date(req.body.fieldCreateTime);
    req.body.fieldUpdateTime = new Date(new Date());
    mongooseUtil.executeUpdate(Field,queryObject,{$set:req.body},res);
});


/**
 * 地块删除
 */
router.post('/deleteField',function(req,res,next){
    var setObject = new Object();
    setObject.fieldStatus = '0';
    var arr = (req.body.arrStr).split(',');
    mongooseUtil.executeUpdate(Field,{fieldCode:{$in:arr}},{$set:setObject},res);
});



/**
 * 批量导入
 */
router.post('/batchImport',function(req,res,next){
   var form = new formidable.IncomingForm();
   //设置上传目录
   form.uploadDir = "/temp";
   form.type = true;
   

   /**
    * 可以修改上传文件的信息等
    */
   form.on('fileBegin', function(name, file) {
       file.path = '/temp/'+file.name;
    });


   /**
    * 解析from表单内容 当前文件已经上传完成
    */
   form.parse(req,function(error,fields,files){
      var list = xlsx.parse(files.field_batchImportInput.path);
      //删除文件
      fs.unlinkSync(files.field_batchImportInput.path);
      //批量插入
      var pushArray = new Array();
      var objs = list[0].data;
      for(var i=1;i<objs.length;i++){
          var objArr = objs[i];
          var objSet = new Object();
          objSet.fieldName = objArr[0];
          objSet.fieldCode = objArr[1];
          objSet.fieldPartnerCode = objArr[2];
          objSet.fieldPartnerName = objArr[3];
          objSet.fieldStatus = objArr[4];
          objSet.fieldSize = objArr[5];
          objSet.fieldVedio = objArr[6];
          objSet.fieldCreateTime = new Date();
          objSet.fieldUpdateTime = new Date();
          pushArray.push(objSet);
      }
      if(pushArray.length===0){
        var result = new Object();
        result.state = 'error';
        result.message = '数据为空';
        res.send(JSON.stringify(result));
      }
      else{
        mongooseUtil.saveBatch(Field,pushArray,res);
      }
     
   });
   
})





module.exports = router;
