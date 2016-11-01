
var superagent = require('superagent');
var expect = require('expect.js');

describe('restApi', function() {
    it('it will get the main page', function(done){
        superagent.get('http://localhost:3000/')
            .end(function(err, res){
                expect(res.status).to.eql(200);
                expect(err).to.eql(null);
                done();
            })
    });
});