
const mongoose = require("mongoose");
const WordsModel = require("../models/wordsModel");
mongoose.Promise = Promise;

// MongoDB Requests

const mongo = {
    saveWord : function (word, next) {
        var query = {"english" : word.english};
        WordsModel.findOneAndUpdate(query, word, {upsert : true}, function(err) {
            if (err) next({error : true, message : err});
            else next({status : "OK"})
        })
    },
    getAllWords : function (next) {
        WordsModel.find(function(err, doc) {
            if (err) next({error : true, message : err});
            else next({status : "OK", data : doc})
        });
    },
    deleteWord : function (word, next) {
        var query = {"english" : word};
        WordsModel.remove(query, function (err) {
            if (err) next({error : true, message : err});
            else next({error:false, status : "OK"})
        })
    }

};

module.exports = mongo;

