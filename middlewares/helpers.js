
const mongoRequests = require("../dbRequests/mongoRequests");
const moment = require("moment");
const jwt = require("jsonwebtoken");
const platformConfigs = require("../config/config");

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
    },

    deleteWord : function (req, next) {
        var word = req.body.english;
        mongoRequests.deleteWord(word, function(result) {
            next(result);
        })
    },

    generateToken : function (data) {
        var token = jwt.sign({
            username : data.username
        }, platformConfigs.jwtSecret);
        return token;
    }

};

module.exports = helpers;