
const moment = require("moment");
const mongoRequests = require("../dbRequests/mongoRequests");

const helpers = {

    addWord : function (req, next) {
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

    deleteWord : function (req, next) {
        var token = req.headers.authorization;
        var word = req.body.english;
        mongoRequests.deleteWord(token, word, function(result) {
            next(result);
        })
    },

    getWord : function (req, next) {
        var token = req.headers.authorization;
        mongoRequests.getWord(token, function(result) {
            next(result);
        })
    },

    getLatestWords : function (req, next) {
        var token = req.headers.authorization;
        mongoRequests.getLatestWords(token, function(result) {
            next(result);
        })
    },

    searchWord : function (req, next) {
        var token = req.headers.authorization;
        var word = req.body.word;
        mongoRequests.searchWord(token, word, function (result) {
            next(result);
        })
    }

};

module.exports = helpers;