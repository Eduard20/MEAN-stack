
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
    jwtSecret: "ewvew327fv439@77fveh00@#cvegc"
};