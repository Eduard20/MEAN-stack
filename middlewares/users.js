
const nodemailer = require('@nodemailer/pro');
const jwt = require("jsonwebtoken");
const platformConfigs = require("../config/config");
const users = {

    generateToken : (data) => {
        let token = jwt.sign({
            username : data.username
        }, platformConfigs.jwtSecret);
        return token;
    },

    sendActivation : () => {
        let transporter = nodemailer.createTransport(platformConfigs.mailConf);
        let mailOptions = {
            from: '"Words Repeat "esimonyan2014@gmail.com',
            to: 'esimonyan@rambler.ru',
            subject: 'Activation Link',
            html: '<a href="https://fb.com">Link</a>'
        };
        transporter.sendMail(mailOptions, (error) => {
            if (error) {
                return console.log(error);
            }
        });
    }
};

module.exports = users;



