
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Mongoose Schema for words

const wordsSchema = new Schema({
    english : {type : String, required : true},
    translation : {type : String, required : true},
    time : {type : String, required : true}
}, {
    versionKey : false,
    strict: false
});


module.exports = mongoose.model("Words", wordsSchema);