var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var roomSchema = new Schema({
    hostCode: Number,
    name: String,
    //added to reflect states in Create.js
    wsTitle: String,
    wsDescript: String,
    //
    joinCode: Number,
    resources: [{
        name: String,
        link: String
    }],
    questions: [String],
    attendees: [String],
    wfclickers: [{
        id: String,
        question: String,
        answers: [String],
        correct: String
    }],
    feedback: String
});

var WorkshopRoom = mongoose.model('WorkshopRoom', roomSchema);
module.exports = WorkshopRoom;
