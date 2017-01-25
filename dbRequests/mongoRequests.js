
const mongoose = require("mongoose");
const WordsModel = require("../models/wordsModel");
const UsersModel = require("../models/usersModel");
const usersFunction = require("../middlewares/users");
mongoose.Promise = Promise;
const _ = require("underscore");
const async = require("async");

const mongo = {

    // user operations

    login : (req, next) => {
        let query = {"username": req.body.username};
        async.waterfall([
            (callback) => {
                UsersModel.find(query, (err, doc) => {
                    (err) ? callback({error: true, message: err}, null) : callback(null, doc);
                });
            },
            (doc, callback) => {
                if (doc.length > 0) {
                    let data = JSON.stringify(doc[0]);
                    data = JSON.parse(data);
                    callback(null, data);
                    return;
                }
                callback({error: true, message: "Username is incorrect"}, null);
            },
            (data, callback) => {
                if (req.body.password === data.password) {
                    callback(null, {error: false, message: data});
                    return;
                }
                callback({error: true, message: "Password is incorrect"}, null);
            }
        ], (err, result) => {
            if (err) {
                next(err);
                return;
            }
            next(result);
        });
    },

    register : (req, next) => {
        let data = req.body;
        let query = {"username" : data.username};
        async.waterfall([
            (callback) => {
                UsersModel.find(query, (err, doc) => {
                    (err) ? callback({error: true, message: err}, null) : callback(null, doc);
                });
            },
            (doc, callback) => {
                if (doc.length > 0) {
                    callback({error: true, message: "Username already exists"}, null);
                    return;
                }
                data.token = usersFunction.generateToken(data);
                callback(null, data);
            },
            (data, callback) => {
                UsersModel.create(data, (err) => {
                    if (err) {
                        callback({error : true, message : err}, null);
                        return;
                    }
                    callback(null, {error : false, message : data.token});
                })
            }
        ], (err, result) => {
            if (err) {
                next(err);
                return;
            }
            next(result);
        })
    },

    checkToken : (token, next) => {
        let query = {"token" : token};
        UsersModel.find(query, (err, doc) => {
            if (err) next({error : true, message : err});
            else {
                if (doc.length > 0) {
                    next({error : false, message : doc[0]});
                } else {
                    next({error : true, message : "Token is not valid"})
                }
            }
        })
    },

    getUserInfo: (req, next) => {
        let token = req.headers.authorization;
        let query = {"token": token};
        UsersModel.find(query, (err, doc) => {
            if (err) {
                next({error : true, message : err})
            } else {
                if (doc.length > 0) {
                    let data = JSON.stringify(doc[0]);
                    data = JSON.parse(data);
                    next({error : false, message : data})
                } else {
                    next({error : true, message : "User was not found"})
                }
            }
        })
    },


    // Words operations

    addWord : (username, word, next) => {
        let data = word;
        data.username = username;
        let query = {"username" : data.username, "word" : data.word};
        WordsModel.findOneAndUpdate(query, data, {upsert : true}, (err) => {
            if (err) next({error: true, message: err});
            else {
                next({error : false});
            }
        })
    },

    deleteWord : (id, next) => {
        let query = {_id : id};
        WordsModel.findOneAndRemove(query, (err) => {
            if (err) next({error : true, message : err});
            else next({error : false})
        })
    },

    searchWord : (username, word, next) => {
        let query = {username : username, word : word};
        WordsModel.find(query, (err, doc) => {
            if (err) next({error: true, message: err});
            else {
                if (doc.length > 0) {
                    next({error : false, message : doc})
                } else {
                    next({error : true, message : "Word was not found"});
                }
            }
        })
    },

    getLatestWords : (username, next) => {
        let query = WordsModel.find({"username" : username}).limit(10).sort({_id:-1});
        query.exec((err, doc) => {
            if (err) {
                next({error : true, message : err})
            } else {
                if (doc.length > 0) {
                    next({error : false, message : doc});
                } else {
                    next({error : true, message : "No words for this user"});
                }
            }
        });
    },

    getWords : (username, dates, next) => {
        let query = WordsModel.find({"username" : username},
            {"time" : {'$gte' : 43523532,'$lte' : 3523532,}}).sort({_id:-1});
        query.exec((err, doc) => {

        })

    }

};

module.exports = mongo;

