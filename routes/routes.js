
var helperFunction = require("../middlewares/helpers");
var mongoRequests = require("../dbRequests/mongoRequests");

module.exports = function(app) {
    app.get('/', function (req, res) {
        fs.readFile('./data/index.html', function (err, html) {
            if (err) {
                throw err;
            }
            res.writeHeader(200, {"Content-Type": "text/html"});
            res.write(html);
            res.end();
        });
    });
    app.post("/addWord", function (req, res) {
        helperFunction.saveWordInMongo(req, function(next) {
            res.send(next);
        })
    });
    app.get("/getAllWords", function (req, res) {
        mongoRequests.getAllWords(function(next) {
            res.send(next);
        })
    });
    app.post("/deleteWord", function (req, res) {
        helperFunction.deleteWord(req, function(next) {
            res.send(next);
        })
    })
};