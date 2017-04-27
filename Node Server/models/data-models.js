var mongoose = require('mongoose');

var url ='mongodb://admin:admin@ds113841.mlab.com:13841/cycling_club';
mongoose.connect(url);
var db = mongoose.connection;

var memberSchema = new mongoose.Schema({
    _id: {type: String},
    token:{type:String},
    name: {type: String},
    picture: {type: String},
    city: {type: String},
    state: {type: String}
});

var clubSchema = new mongoose.Schema({
    _id: {type: String},
    city: {type: String},
    state: {type: String},
    picture: {type: String},
    members: [memberSchema],
    location: {long: Number, lat: Number}
});

var notificationSchema = new mongoose.Schema({
    text: {type: String},
    status: {type: Boolean}
});

var eventSchema = new mongoose.Schema({
    _id: {Owner: String, dueDate: Date},
    title: {type: String},
    location: {long: Number, lat: Number},
    status: {type: String, required: true},
    miles: {type: Number, required: false},
    startPoint: {type: String, required: false},
    endPoint: {type: String, required: false},
    notification: notificationSchema,
    club: clubSchema,
    members: [memberSchema]
});

var conversationSchema = new mongoose.Schema({
    _id: {sender: memberSchema, receiver: memberSchema},
    messages: [{sendDate: Date, messageContent: String}]
});

var Events = mongoose.model('Events', eventSchema);

var dataModel = {dbConnection:  db,
    member: mongoose.model("member", memberSchema),
    club: mongoose.model("club", clubSchema),
    notification: mongoose.model("notification", notificationSchema),
    event: mongoose.model("event", eventSchema),
    conversation: mongoose.model("conversation", conversationSchema)
};

module.exports = dataModel;
