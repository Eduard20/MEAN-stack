
const moment = require("moment");
const mongoRequests = require("../dbRequests/mongoRequests");

const helpers = {

    // saveWordInMongo : function(req, next) {
    //     var time = new Date();
    //     var word = {
    //         english : req.body.english,
    //         translation : req.body.translation,
    //         time : moment(time).unix()
    //     };
    //     mongoRequests.saveWord(word, function (result) {
    //         next(result);
    //     })
    // },
    //
    // deleteWord : function (req, next) {
    //     var word = req.body.english;
    //     mongoRequests.deleteWord(word, function(result) {
    //         next(result);
    //     })
    // },
    //
    // getAllWords : function (next) {
    //     mongoRequests.getAllWords(function(result) {
    //         next(result)
    //     })
    // },

    add : function (req, next) {
        var token = req.headers.authorization;
        var time = new Date();
        var word = {
            english : req.body.english,
            translation : req.body.translation,
            time : moment(time).unix()
        };
        mongoRequests.addWord(token, word, function (result) {
            next(result);
        })
    },

    delete : function (req, next) {
        var token = req.headers.authorization;
        var word = req.body.english;
        mongoRequests.delete(token, word, function(result) {
            next(result);
        })
    },

    getWord : function (req, next) {
        var token = req.headers.authorization;
        mongoRequests.getWord(token, function(result) {
            next(result);
        })
    }

};

module.exports = helpers;