
const helperFunction = require("../middlewares/helpers");
const mongoRequests = require("../dbRequests/mongoRequests");
const express = require("express");
const router = express.Router();

    // User activities

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

    router.post("/api/userInfo", (req, res) => {
        mongoRequests.getUserInfo(req, (next) => {
            res.send(next);
        });
    });

    // Words activities

    router.post("/api/addWord", (req, res) => {
        helperFunction.addWord(req, (next) => {
            res.send(next);
        })
    });

    router.get("/api/getLatestWords", (req, res) => {
        helperFunction.getLatestWords(req, (next) => {
            res.send(next);
        })
    });

    router.post("/api/deleteWord", (req, res) => {
        helperFunction.deleteWord(req, (next) => {
            res.send(next);
        })
    });

    router.post("/api/searchWord", (req, res) => {
        helperFunction.searchWord(req, (next) => {
            res.send(next);
        })
    });


    /////////

    // router.get("/api/getLatestWords", function (req, res) {
    //     helperFunction.getLatestWords(req, function (next) {
    //         res.send(next);
    //     })
    // });




module.exports = router;