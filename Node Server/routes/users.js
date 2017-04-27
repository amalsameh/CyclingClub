var express = require('express');
var dbModel=require('../models/data-models');
var member=dbModel.member;
var db=dbModel.dbConnection;

var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/',function(req,res,next){//save ,Update /Post
   saveUser(req.body);
    res.send(true);
  });

var saveUser=function(obj){
var Query = {'_id':obj._id};
var operator={'$set':{'token':obj.token}};
var options={'upsert':true};
member.update(Query,operator,options,function(err,numofRows){
if(err)throw err;
console.log(numofRows);
});
};

module.exports = router;
