var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');
var should = chai.should();

chai.use(chaiHttp);

describe('API Test', function() {
    it('Test GET /api/v2/recipes', function(done) {
        chai.request(server)
            .get('/api/v2/recipes')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});

describe('Test', function () {
    it('Test GET /api/v2/info', function(done) {
        chai.request(server)
            .get('/api/v2/info')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('Test', function () {
    it('Test GET /api/v2/recipes/:nummer', function(done) {
        chai.request(server)
            .get('/api/v2/recipes/:nummer')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
            });
    });
});

describe('Test', function () {
    it('Test GET /api/v2/recipes/?category', function(done) {
        chai.request(server)
            .get('/api/v2/recipes/:category')
            .end(function(err, res) {
                res.should.have.status(200);
                res.body.should.be.a('array');
                done();
            });
    });
});