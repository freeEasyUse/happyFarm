var mongoose = require('mongoose');
//创建商家用户 Schema
var BUserSchema = mongoose.Schema({
    buserCardNumber:String,
    buserName:String,
    buserPhone:String,
    buserCreateDate:Date,
    buserUpdateDate:Date,
    buserFieldCode:String,
    buserBusinessCode:String,
    buserFieldStartDate:Date,
    buserFieldEndDate:Date,
    buserBusinessDes:String
});


//创建地块model
var BUser = mongoose.model('BUser', BUserSchema)