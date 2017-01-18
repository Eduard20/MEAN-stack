
module.exports = {
    port: parseInt(process.env.PORT) || 3000,
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
    }
};