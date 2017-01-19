
const mongoose = require("mongoose");
const WordsModel = require("../models/wordsModel");
const UsersModel = require("../models/usersModel");
var helperFunction = require("../middlewares/helpers");
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
    },
    login : function (req, next) {
        var query = {"username" : req.body.username};
        UsersModel.find(query, function (err, doc) {
            if (err) next({error : true, message : err});
            else {
                if (doc.length > 0) {
                    var data = JSON.stringify(doc[0]);
                    data = JSON.parse(data);
                    if (req.body.password === data.password) {
                        next({error : false, message : data})
                    } else {
                        next({error : true, message : "Password is incorrect"})
                    }
                } else {
                    next({error : true, message : "Username is incorrect"});
                }
            }
        })
    },
    register : function (req, next) {
        var data = req.body;
        var query = {"username" : req.body.username};
        UsersModel.find(query, function (err, doc) {
            if (err) next({error : true, message : err});
            else {
                if (doc.length > 0) {
                    next({error : true, message : "Username already exists"});
                } else {
                    data.token = helperFunction.generateToken(data);
                    UsersModel.create(data, function (err) {
                        if (err) next({error : true, message : err});
                        else next({error : false, token : data.token})
                    })
                }
            }
        })
    }
};

module.exports = mongo;

