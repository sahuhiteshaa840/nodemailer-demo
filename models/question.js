const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const questionSchema = new Schema({
    question: {
        type: String,
        unique: true,
        required: true
    },
    ans: {
        type: String,
        required: true
    },
    options: [String],
    category: String,
});

const question = mongoose.model('question', questionSchema);

module.exports = question;

// ["surat", "vapi"]

