var mongoose = require('mongoose');
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


//创建地块model
var Field = mongoose.model('Field', FieldSchema);

module.exports = Field;