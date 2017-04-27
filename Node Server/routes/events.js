var express = require('express');
var dbModel=require('../models/data-models');
var eventDAL=require('./event');
var router = express.Router();
var event=dbModel.event;
var db=dbModel.dbConnection;
router.get('/', function (req, res, next) { //Listing /events
  event.find(function(err,data){
    if (err) console.log("err :" + err);
    res.json(data);
  });
});

router.get('/:id', function (req, res, next) {
  console.log(req.params.id);
   query= {'_id.Owner' :req.params.id}; //Listing /events
  event.findOne(query,function(err,data){
    if (err) console.log("err :" + err);
    res.json(data);
  });
});

router.post('/',function(req,res,next){ 
  eventobj=req.body;
  var Query = {'_id':eventobj._id};
var operator={'$set':{'status':eventobj.status,
title:eventobj.title,
location:eventobj.location,
startPoint:eventobj.startPoint,
endPoint:eventobj.endPoint,
miles:eventobj.miles,
notification:eventobj.notification,
club:eventobj.club,
members:eventobj.members
}};
var options={'upsert':true};
event.update(Query,operator,options,function(err,numofRows){
if(err)throw err;
    res.send(true);
  });
});

router.put('/track',function(req,res,next){//Update Status and Location
  eventDAL.updateLocation(req.body);
});

router.put('/join',function(req,res,next){
  eventDAL.addEventMembers(req.body);
});

router.put('/Notify',function(req,res,next){//TODO send Notification to all users
  eventDAL.addNotification(req.body);
});

module.exports = router;
