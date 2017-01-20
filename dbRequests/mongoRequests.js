
const mongoose = require("mongoose");
const WordsModel = require("../models/wordsModel");
const UsersModel = require("../models/usersModel");
const usersFunction = require("../middlewares/users");
mongoose.Promise = Promise;

const mongo = {

    saveWord: function (word, next) {
        var query = {"english": word.english};
        WordsModel.findOneAndUpdate(query, word, {upsert: true}, function (err) {
            console.log(err);
            if (err) next({error: true, message: err});
            else next({status: "OK"})
        })
    },

    getWords: function (next) {
        var query = WordsModel.find().sort({_id: -1}).limit(10);
        query.exec(function (err, doc) {
            if (err) next({error: true, message: err});
            else next({status: "OK", data: doc})
        });
    },

    deleteWord: function (word, next) {
        var query = {"english": word};
        WordsModel.remove(query, function (err) {
            if (err) next({error: true, message: err});
            else next({error: false, status: "OK"})
        })
    },

    login: function (req, next) {
        var query = {"username": req.body.username};
        UsersModel.find(query, function (err, doc) {
            if (err) next({error: true, message: err});
            else {
                if (doc.length > 0) {
                    var data = JSON.stringify(doc[0]);
                    data = JSON.parse(data);
                    if (req.body.password === data.password) {
                        next({error: false, message: data})
                    } else {
                        next({error: true, message: "Password is incorrect"})
                    }
                } else {
                    next({error: true, message: "Username is incorrect"});
                }
            }
        })
    },

    register: function (req, next) {
        var data = req.body;
        var query = {"username": req.body.username};
        UsersModel.find(query, function (err, doc) {
            if (err) next({error: true, message: err});
            else {
                if (doc.length > 0) {
                    next({error: true, message: "Username already exists"});
                } else {
                    data.token = usersFunction.generateToken(data);
                    UsersModel.create(data, function (err) {
                        if (err) next({error: true, message: err});
                        else next({error: false, token: data.token})
                    })
                }
            }
        })
    },

    searchWord: function (req, next) {
        var word = req.body.word;
        var query = {"english": word};
        WordsModel.find(query, function (err, doc) {
            if (err) next({error: true, message: err});
            else {
                if (doc.length > 0) {
                    next({error: false, message: doc})
                } else {
                    next({error: true, message: "Word was not found"});
                }
            }
        })
    },

    getUserInfo: function (req, next) {
        var token = req.headers.authorization;
        var query = {"token": token};
        UsersModel.find(query, function (err, doc) {
            if (err) next({error: true, message: err});
            else {
                if (doc.length > 0) {
                    next({error: false, message: doc});
                } else {
                    next({error: true, message: "User was not found"});
                }
            }
        });
    }
};

module.exports = mongo;

