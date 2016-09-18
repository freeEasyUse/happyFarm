var express = require('express');
var router = express.Router();

/* */
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

module.exports = router;
