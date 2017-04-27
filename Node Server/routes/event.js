var mongoose = require('mongoose');
var dbModel=require('../models/data-models');

var db=dbModel.dbConnection;
var events = dbModel.event;
db.on('error', console.error.bind(console, 'connection error:'));

var updateEventStatus=function(eventobj){
var Query = {'_id':eventobj._id};
var operator={'$set':{'status':eventobj.status}};
var options={'upsert':false};
event.update(Query,operator,options,function(err,numofRows){
if(err)throw err;
console.log(numofRows);
});
};

var addEventMembers=function(eventobj){
var Query = {'_id':eventobj._id};
var operator={'$set':{'members':eventobj.members}};
var options={'upsert':false};
event.update(Query,operator,options,function(err,numofRows){
if(err)throw err;
console.log(numofRows);
});
};

var updateEventLocation=function(eventobj){
var Query = {'_id':eventobj._id};
var operator={'$set':{'location':eventobj.location,'status':eventobj.status}};
var options={'upsert':false};
event.update(Query,operator,options,function(err,numofRows){
if(err)throw err;
console.log(numofRows);
});
};

var addEventNotification=(function(obj){
var Query = {'_id':obj._id};
var operator={'$set':{'notification':obj.notification}};
var options={'upsert':false};
event.update(Query,operator,options,function(err,numofRows){
if(err)throw err;
console.log(numofRows);
});
});

var saveEvent=function(eventobj){
var Query = {'_id':eventobj._id};
var operator={'$set':{'status':eventobj.status,
'title':eventobj.title,
'location':eventobj.location,
'startPoint':eventobj.startPoint,
'endPoint':eventobj.endPoint,
'miles':eventobj.miles,
'notification':eventobj.notification,
'club':eventobj.club,
'members':eventobj.members
}};
var options={'upsert':true};

event.update(Query,operator,options,function(err,numofRows){
if(err)throw err;
console.log(numofRows);
});
};


var event={save:saveEvent,
    updateLocation:updateEventLocation,
    addNotification:addEventNotification,
    addMember:addEventMembers,
    updateStatus:updateEventStatus};
    
module.exports=event;