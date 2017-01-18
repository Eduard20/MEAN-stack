var express = require('express');
var logger = require('morgan');
var bodyParser = require('body-parser');
var mongoose = require("mongoose");
var platformConfigs = require('./config/config');
var port = platformConfigs.port;
var app = express();

process.env.NODE_ENV = platformConfigs.mode;

// MongoDB

var dbURI = 'mongodb://edodb:omega2020@ds013564.mlab.com:13564/heroku_qwz21fc2';
mongoose.connect(dbURI);
mongoose.connection.on("connected", function () {console.log("Mongo default connection open")});
mongoose.connection.on("error", function (err)  {console.log("Mongo default connection error: " + err)});
mongoose.connection.on("disconnected", function () {console.log("Mongo default connection disconnected")});

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/data'));

require('./routes/routes')(app);

app.use(function (req, res, next) {
    var err = new Error('Not Found');
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

app.listen(port, function(){
    console.log('listening on port ' + port + ' in ' + process.env.NODE_ENV + ' mode');
});
