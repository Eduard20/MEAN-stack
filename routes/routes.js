
var helperFunction = require("../middlewares/helpers");
var mongoRequests = require("../dbRequests/mongoRequests");
const express = require("express");
const router = express.Router();

    router.get('/', function (req, res) {
        fs.readFile('./data/index.html', function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    });
    router.post("/addWord", function (req, res) {
        helperFunction.saveWordInMongo(req, function(next) {
            res.send(next);
        })
    });
    router.get("/getWords", function (req, res) {
        mongoRequests.getWords(function(next) {
            res.send(next);
        })
    });
    router.post("/deleteWord", function (req, res) {
        helperFunction.deleteWord(req, function(next) {
            res.send(next);
        })
    });
    router.post("/login", function (req, res) {
        if (undefined != req.body.username) {
            mongoRequests.login(req, function (next) {
                res.send(next);
            })
        } else {
            res.send({error : true, message : "Username is not provided"});
        }
    });
    router.post("/register", function (req, res) {
        if (undefined != req.body.username) {
            mongoRequests.register(req, function (next) {
                res.send(next);
            })
        } else {
            res.send({error : true, message : "Username is not provided"});
        }
    });
    router.post("/api/userInfo", function (req, res) {
        if (undefined != req.headers.authorization) {
            mongoRequests.getUserInfo(req, function (next) {
                res.send(next);
            })
        } else {
            res.send({error : true, message : 'token is not provided'})
        }
    });
    router.post("/searchWord", function (req, res) {
        if (undefined != req.body.word) {
            mongoRequests.searchWord(req, function (next) {
                res.send(next);
            })
        } else {
            res.send({error : true, message : "Word is not provided"});
        }
    });
module.exports = router;