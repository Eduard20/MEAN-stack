
module.exports = {
    port: parseInt(process.env.PORT) || 8000,
    mode: 'development',
    mongoConf: {
        url: "mongodb://localhost/words",
        options: {
            server: {
                auto_reconnect: true,
                reconnectTries : 17280,
                reconnectInterval : 5000
            }
        }
    },
    mongoURI : "mongodb://edodb:omega2020@ds013564.mlab.com:13564/heroku_qwz21fc2",
    jwtSecret: "ewvew327fv439@77fveh00@#cvegc",
    mailConf : {
        service: 'gmail',
        auth: {
            user: 'wordsrepeatinfo@gmail.com',
            pass: 'words2017'
        }
    }
};