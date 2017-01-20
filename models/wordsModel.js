
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Mongoose Schema for words

const wordsSchema = new Schema({
}, {
    versionKey : false,
    strict: false
});


module.exports = mongoose.model("Words", wordsSchema);