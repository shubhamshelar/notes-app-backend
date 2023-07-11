const mongoose =require('mongoose');

const notesSchema = new mongoose.Schema({
    title :{type: String, required: true},
    collection :{type: String, required: true},
    content : {type: String},
    timeStamp: {type: Date, default: Date.now()}

});

const noteModel = new mongoose.model('notes',notesSchema);

module.exports = noteModel;