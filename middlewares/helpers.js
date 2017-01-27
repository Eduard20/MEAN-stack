
const moment = require("moment");
const mongoRequests = require("../dbRequests/mongoRequests");
const platformConfigs = require("../config/config");
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
    },

    getLatestWords : (req, next) => {
        let token = req.headers.authorization;
        let username = jwt.verify(token, platformConfigs.jwtSecret).username;
        mongoRequests.getLatestWords(username, (result) => {
            next(result);
        })
    },

    getWords : (req, next) => {
        let token = req.headers.authorization;
        let username = jwt.verify(token, platformConfigs.jwtSecret).username;
        let date_from = moment(req.body.from).unix();
        let date_till = moment(req.body.till).unix();
        mongoRequests.getWords(username, date_from, date_till, (result) => {
            next(result);
        })
    },

    editWord : (req, next) => {
        if (req.body) {
            mongoRequests.editWord(req.body, (result) => {
                next(result);
            })
        } else {
            next({error:true, message : "something wrong"});
        }
    },

    getProfileInfo : (req, next) => {
        if (req.body) {
            mongoRequests.getProfileInfo(req.body.data, (result) => {
                next(result);
            })
        } else {
            next({error:true, message : "data not provided"})
        }
    },

    searchByEmail : (req, next) => {
        if (req.body) {
            mongoRequests.searchByEmail(req.body.username, (result) => {
                next(result);
            })
        } else {
            next({error:true, message : "data not provided"})
        }
    }

};

module.exports = helpers;