var MongoClient = require('mongodb').MongoClient;
var partnerdb = new Object();

var insertDocuments = function(db, callback) {
  // Get the documents collection
  var collection = db.collection('documents');
  // Insert some documents
  collection.insertMany([
    {a : 1}, {a : 2}, {a : 3}
  ], function(err, result) {
    console.log("Inserted 3 documents into the collection");
    callback(result);
  });
}

partnerdb.insertDocument = function(){
    // Connection URL
    var url = 'mongodb://localhost:27017/happyFarm';
    // Use connect method to connect to the server
    MongoClient.connect(url, function(err, db) {
        console.log("Connected correctly to server");
        insertDocuments(db, function() {
            db.close();
        });
    });
}
module.exports = partnerdb;