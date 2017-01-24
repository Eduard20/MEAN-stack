
// Modules

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const platformConfigs = require('./config/config');
const port = platformConfigs.port;
const app = express();
const helpers = require("./middlewares/helpers");
const routes = require("./routes/routes");
const auth = require("./middlewares/auth");
process.env.NODE_ENV = platformConfigs.mode;

// MongoDB

mongoose.connect(platformConfigs.mongoURI);
// mongoose.connect(platformConfigs.mongoConf.url,platformConfigs.mongoConf.options);
mongoose.connection.on("connected", () => {console.log("Mongo default connection open")});
mongoose.connection.on("error", (err) =>  {console.log("Mongo default connection error: " + err)});
mongoose.connection.on("disconnected", () => {console.log("Mongo default connection disconnected")});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/data'));
app.use("/api", auth.isAuth);
app.use("/", routes);

app.use(function (req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
});
// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.json({
            message: err.message,
            error: err
        });
    })
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
        message: err.message,
        error: {}
    });
});

app.listen(port, () => {
    console.log(`listening on port ${port} in ${process.env.NODE_ENV} mode with process id ${process.pid}`);
});
