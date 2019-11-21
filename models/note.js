var mongoose = require('mongoose');
var noteSchema = new mongoose.Schema({
    content: {
        type: String,
        required: true
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    _createdAt:{
        type: Date,
        default: Date.now(),
        required: true
    }
});

module.exports = mongoose.model('note', noteSchema);