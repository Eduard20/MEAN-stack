
const jwt = require("jsonwebtoken");
const platformConfigs = require("../config/config");

const users = {

    generateToken : function (data) {
        var token = jwt.sign({
            username : data.username
        }, platformConfigs.jwtSecret);
        return token;
    }

};

module.exports = users;