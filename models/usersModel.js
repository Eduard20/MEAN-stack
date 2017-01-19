
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Mongoose Schema for words

const usersSchema = new Schema({}, {
    versionKey : false,
    strict: false
});


module.exports = mongoose.model("Users", usersSchema);