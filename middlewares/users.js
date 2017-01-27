
// const nodemailer = require('@nodemailer/pro');
const shortid = require("shortid");
const jwt = require("jsonwebtoken");
const platformConfigs = require("../config/config");

const users = {

    generateToken : (data) => {
        let token = jwt.sign({
            username : data.username
        }, platformConfigs.jwtSecret);
        return token;
    },

    // encodeUserId : (views) => {
    //     let hash = crypto.createHmac("sha256", platformConfigs.hashSecret)
    //         .update(JSON.stringify(views))
    //         .digest("base64");
    //     return hash;
    // }

    createId : () => {
        return shortid.generate();
    }

    // sendActivation : (views) => {
    //     let link = `https://wordsrepeat.herokuapp.com/${views.username}`;
    //     let transporter = nodemailer.createTransport(platformConfigs.mailConf);
    //     let mailOptions = {
    //         from : 'Words Repeat',
    //         to: views.username,
    //         subject: 'Activation Link',
    //         html: `<a href="${link}">Link</a>`
    //     };
    //     transporter.sendMail(mailOptions, (error) => {
    //         if (error) {
    //             return console.log(error);
    //         }
    //     });
    // }
};

module.exports = users;



