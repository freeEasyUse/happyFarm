var express = require('express');
var router = express.Router();
var common = require('../common/common');
var mongooseUtil = require('../database/mongooseUtil');
var mongoose = require('mongoose');

/**
 * 商家 地块管理
 */

//创建商家地块 Schema
var FieldSchema = mongoose.Schema({
    fieldName: String,
    fieldCode:String,
    fieldPartnerCode:String,
    fieldPartnerName:String,
    fieldSize:Number,
    fieldCreateTime:Date,
    fieldUpdateTime:Date,
    fieldVedio:String,
    fieldDes:String,
    fieldUserCode:String,
    fieldStatus:Number,
    fieldUserName:String
});


//创建商家model
var Field = mongoose.model('Field', FieldSchema)

//商家 所属地块查询  查询
router.get('/', function(req, res, next) {
  mongooseUtil.executeQuery(Field,{},res)
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


module.exports = router;
