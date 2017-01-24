
const mongoRequests = require("../dbRequests/mongoRequests");
const async = require("async");

const auth = {

    // middleware to check user token

    isAuth : (req, res, next) => {
        if (undefined === req.headers.authorization) {
            res.status(401);
            res.json({error : true, message : "Unauthorized"});
        } else {
            let token = req.headers.authorization;
            mongoRequests.checkToken(token, (result) => {
                if (result.error) {
                    res.status(404);
                    res.json(result);
                } else {
                    next();
                }
            })

        }
    }

};

module.exports = auth;