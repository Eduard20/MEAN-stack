
const mongoose = require("mongoose");
const WordsModel = require("../models/wordsModel");
const UsersModel = require("../models/usersModel");
const usersFunction = require("../middlewares/users");
mongoose.Promise = Promise;
const _ = require("underscore");
const async = require("async");

const mongo = {

    // saveWord: function (word, next) {
    //     var query = {"english": word.english};
    //     WordsModel.findOneAndUpdate(query, word, {upsert: true}, function (err) {
    //         console.log(err);
    //         if (err) next({error: true, message: err});
    //         else next({status: "OK"})
    //     })
    // },
    //
    // getWords: function (next) {
    //     var query = WordsModel.find().sort({_id: -1}).limit(10);
    //     query.exec(function (err, doc) {
    //         if (err) next({error: true, message: err});
    //         else next({status: "OK", data: doc})
    //     });
    // },

    deleteWord: function (word, next) {
        var query = {"english": word};
        WordsModel.remove(query, function (err) {
            if (err) next({error: true, message: err});
            else next({error: false, status: "OK"})
        })
    },

    login: function (req, next) {
        var query = {"username": req.body.username};
        WordsModel.find(query, function (err, doc) {
            if (err) next({error: true, message: err});
            else {
                if (doc.length > 0) {
                    console.log(doc);
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
        WordsModel.find(query, function (err, doc) {
            if (err) next({error: true, message: err});
            else {
                if (doc.length > 0) {
                    next({error: true, message: "Username already exists"});
                } else {
                    data.token = usersFunction.generateToken(data);
                    data.words = [];
                    WordsModel.create(data, function (err, doc) {
                        console.log(err);
                        console.log(doc);
                        if (!err) {
                            next({error : false, message : doc.token});
                        } else {
                            next({error : true, message : err});
                        }
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
        WordsModel.find(query, function (err, doc) {
            if (err) {
                next({error : true, message : err})
            } else {
                if (doc.length > 0) {
                    var data = JSON.stringify(doc[0]);
                    data = JSON.parse(data);
                    next({error : false, message : data})
                } else {
                    next({error : true, message : "User was not found"})
                }
            }
        })
    },

    /// API 2

    addUserInfo : function (data) {
        var info = {
            username: data.username,
            language: data.language,
            token: data.token,
            words: []
        };
        var query = {"username": info.username};
        WordsModel.findOneAndUpdate(query, info, {upsert: true}, function(err){});
    },

    addWord : function (token, word, next) {
        var query = {"token" : token};
        WordsModel.find(query, function (err, doc) {
            if (err) {
                next({error : true, message : err})
            } else {
                if (doc.length > 0) {
                    var data = JSON.stringify(doc[0]);
                    data = JSON.parse(data);
                    var some = data.words;
                    var f = _.find(some, function (one) {
                        return (one.english == word.english);
                    });
                    if (undefined != f) {
                        some[some.indexOf(f)] = word;
                    } else {
                        some.push(word);
                    }
                    data.words = some;
                    var query = {"username": data.username};
                    WordsModel.findOneAndUpdate(query, data, {upsert: true, new :true}, function(err, doc){
                        if (!err) {
                            next({error : false, message: doc})
                        } else {
                            next({error : true, message : err})
                        }
                    });
                } else {
                    next({error : true, message : "User does not exist"})
                }
            }
        })
    },

    delete : function (token, word, next) {
        var query = {"token": token};
        WordsModel.find(query, function (err, doc) {
            if (err) {
                next({error : true, message : err})
            } else {
                if (doc.length > 0) {
                    var data = JSON.stringify(doc[0]);
                    data = JSON.parse(data);
                    var some = data.words;
                    var f = _.find(some, function (one) {
                        return (one.english == word);
                    });
                    if (undefined != f) {
                        some.splice(some.indexOf(f), 1);
                        data.words = some;
                        var query = {"username": data.username};
                        WordsModel.findOneAndUpdate(query, data, {upsert: true, new :true}, function(err, doc){
                            if (!err) {
                                next({error : false, message: doc})
                            } else {
                                next({error : true, message : err})
                            }
                        });
                    } else {
                        next({error : true, message : "Word was not found"})
                    }
                } else {
                    next({error : true, message : "User does not exist"})
                }
            }
        })
    },

    getWord : function (token, next) {
        var query = {"token": token};
        WordsModel.find(query, function (err, doc) {
            if (err) {
                next({error : true, message : err})
            } else {
                if (doc.length > 0) {
                    var data = JSON.stringify(doc[0]);
                    data = JSON.parse(data);
                    next({error : false, message : data.words})
                } else {
                    next({error : true, message : "User does not exist"})
                }
            }
        })

    }
};

module.exports = mongo;

