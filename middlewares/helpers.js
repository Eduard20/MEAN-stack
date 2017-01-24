
const moment = require("moment");
const mongoRequests = require("../dbRequests/mongoRequests");
const platformConfigs = require("../config/config")
const jwt = require("jsonwebtoken");

const helpers = {

    addWord : (req, next) => {
        if (req.body.word) {
            let token = req.headers.authorization;
            let username = jwt.verify(token, platformConfigs.jwtSecret).username;
            let word = req.body;
            word.time = moment(new Date()).unix();
            mongoRequests.addWord(username, word, (result) => {
                next(result);
            })
        } else {
            next({error : true, message : "Word is not provided"});
        }
    },

    getLatestWords : (req, next) => {
        let token = req.headers.authorization;
        let username = jwt.verify(token, platformConfigs.jwtSecret).username;
        mongoRequests.getLatestWords(username, (result) => {
            next(result);
        })
    },

    deleteWord : (req, next) => {
        if (req.body._id) {
            let id = req.body._id;
            mongoRequests.deleteWord(id, (result) => {
                next(result);
            })
        }
    },

    searchWord : (req, next) => {
        if (req.body.word) {
            let token = req.headers.authorization;
            let username = jwt.verify(token, platformConfigs.jwtSecret).username;
            let word = req.body.word;
            mongoRequests.searchWord(username, word, (result) => {
                next(result);
            })
        } else {
            next({error : true, message : "Word is not provided"});
        }
    }

};

module.exports = helpers;