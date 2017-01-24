
const mongoose = require("mongoose");
const WordsModel = require("../models/wordsModel");
const UsersModel = require("../models/usersModel");
const usersFunction = require("../middlewares/users");
mongoose.Promise = Promise;
const _ = require("underscore");
const async = require("async");

const mongo1 = {

    // user operations

    login: function (req, next) {
        var query = {"username": req.body.username};
        WordsModel.find(query, function (err, doc) {
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
        WordsModel.find(query, function (err, doc) {
            if (err) next({error: true, message: err});
            else {
                if (doc.length > 0) {
                    next({error: true, message: "Username already exists"});
                } else {
                    data.token = usersFunction.generateToken(data);
                    data.words = [];
                    WordsModel.create(data, function (err, doc) {
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

    // Words operations

    searchWord: function (token, word, next) {
        var query = {"token": token};
        WordsModel.find(query, function (err, doc) {
            if (err) next({error: true, message: err});
            else {
                if (doc.length > 0) {
                    var data = JSON.stringify(doc[0]);
                    data = JSON.parse(data);
                    var some = data.words;
                    var f = _.find(some, function (one) {
                        return (one.english == word);
                    });

                    if (undefined != f) {
                        next({error : false, message : {"words" : [f]}})
                    } else {
                        next({error : true, message : "Word was not found"})
                    }
                } else {
                    next({error : true, message : "User does not exist"})
                }
            }
        })
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

    deleteWord : function (token, word, next) {
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

    },

    getLatestWords : function (token, next) {
        var query = WordsModel.find({"token": token}, {"words" : 1}, { $limit : 5 });
        query.exec(function (err, doc) {
            if (err) {
                next({error : true, message : err})
            } else {
                if (doc.length > 0) {
                    var data = JSON.stringify(doc[0]);
                    data = JSON.parse(data);
                    console.log(data);
                    next({error : false, message : data.words})
                } else {
                    next({error : true, message : "User does not exist"})
                }
            }
        })

    }
};

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
                    data.status = 0;
                    callback(null, data);
                },
                (data, callback) => {
                    UsersModel.create(data, (err) => {
                        if (err) {
                            callback({error : true, message : err}, null);
                            return;
                        }
                        callback(null, {error : false, message : data.token});
                        usersFunction.sendActivation();
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

    getLatestWords : (username, next) => {
        let query = WordsModel.find({"username" : username}).limit(10).sort({_id:-1});
        query.exec((err, doc) => {
            if (err) {
                next({error : true, message : err})
            } else {
                if (doc.length > 0) {
                    next({error : false, message : doc});
                } else {
                    next({error : true, message : "No words for this user"})
                }
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
    }




    //////

};

module.exports = mongo;

