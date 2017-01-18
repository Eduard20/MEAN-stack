
const mongoose = require("mongoose");
const WordsModel = require("../models/wordsModel");
mongoose.Promise = Promise;

// MongoDB Requests

const mongo = {
    saveWord : function (word, next) {
        var query = {"english" : word.english};
        WordsModel.findOneAndUpdate(query, word, {upsert : true}, function(err) {
            if (err) next({error : true, message : err});
            else next({status : "OK", data : word})
        })
    }
};

module.exports = mongo;

