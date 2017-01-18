
const mongoRequests = require("../dbRequests/mongoRequests");
const moment = require("moment");

const helpers = {
    saveWordInMongo : function(req, next) {
        var time = new Date();
        var word = {
            english : req.body.english,
            translation : req.body.translation,
            time : moment(time).unix()
        };
        mongoRequests.saveWord(word, function (result) {
            next(result);
        })
    }
};

module.exports = helpers;