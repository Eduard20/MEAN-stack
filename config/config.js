
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
    mongoURI : "mongodb://edodb:omega@ds117889.mlab.com:17889/heroku_w9zxp99m",
    jwtSecret: "ewvew327fv439@77fveh00@#cvegc",
    hashSecret : "wqbhfjevwfj7341`2^*(34)yeahew&3",
    voiceKey : "967aef489038401089b90983f7df7f74"
    // mailConf : {
    //     service: 'gmail',
    //     auth: {
    //         user: 'wordsrepeatinfo@gmail.com',
    //         pass: 'words2017'
    //     }
    // }
};