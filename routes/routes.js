
const helperFunction = require("../middlewares/helpers");
const mongoRequests = require("../dbRequests/mongoRequests");
const express = require("express");
const router = express.Router();

    router.post("/login", (req, res) => {
        if (undefined != req.body.username) {
            mongoRequests.login(req, (next) => {
                res.send(next);
            })
        } else {
            res.send({error : true, message : "Username is not provided"});
        }
    });

    router.post("/register", (req, res) => {
        if (undefined != req.body.username) {
            mongoRequests.register(req, (next) => {
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

    router.post("/api/addWord", function (req, res) {
        helperFunction.addWord(req, function (next) {
            res.send(next);
        })
    });

    router.post("/api/deleteWord", function (req, res) {
        helperFunction.deleteWord(req, function (next) {
            res.send(next);
        })
    });

    router.get("/api/getWord", function (req, res) {
        helperFunction.getWord(req, function (next) {
            res.send(next);
        })
    });

    router.get("/api/getLatestWords", function (req, res) {
        helperFunction.getLatestWords(req, function (next) {
            res.send(next);
        })
    });

    router.post("/api/searchWord", function (req, res) {
        if (undefined != req.body.word) {
            helperFunction.searchWord(req, function (next) {
                res.send(next);
            })
        } else {
            res.send({error : true, message : "Word is not provided"});
        }
    });


module.exports = router;