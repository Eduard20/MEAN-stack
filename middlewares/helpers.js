
const moment = require("moment");
const mongoRequests = require("../dbRequests/mongoRequests");

const helpers = {

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