

module.exports = function(app) {
    app.get('/', function(req,res,next){
        res.send('hey')
    });
    // app.all('*', function(req,res,next){
    //     res.send('not found')
    // })
}