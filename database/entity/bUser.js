var mongoose = require('mongoose');
//创建商家用户 Schema
var BUserSchema = mongoose.Schema({
    buserCardNumber:String,
    buserName:String,
    buserPhone:String,
    buserCreateDate:Date,
    buserUpdateDate:Date,
    buserFieldCode:String,
    buserFieldName:String,
    buserBusinessCode:String,
    buserFieldStartDate:Date,
    buserFieldEndDate:Date,
    buserBusinessDes:String,
    buserState:Number,
    buserPassword:String
});


//创建地块model
var BUser = mongoose.model('BUser', BUserSchema);
module.exports = BUser;