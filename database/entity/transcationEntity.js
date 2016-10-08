var mongoose = require('mongoose');
//创建事务 Schema
var TransactionSchema = mongoose.Schema({
    source:String,
    destination:String,
    value:String,
    state:String
});
//创建地块model
var TransactionEntity = mongoose.model('TransactionEntity', TransactionSchema);
module.exports = TransactionEntity;