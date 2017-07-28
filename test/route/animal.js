/**
 *  Animal Functional Test
 *  Created by caminte-cli script
 **/

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'test';
}

var request = require('supertest');
var app = require('../../app');
var id, animal;

describe('Animal routes:', function () {

    before(function (done) {
       done();
    });

    after(function (done) {
       done();
    });

    it('animals#new', function (done) {
        request(app)
            .get('/animals/new')
            // .field('name', 'my awesome avatar')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.be.object;
                done();
            });
    });

    it('animals#create', function (done) {
        request(app)
            .post('/animals')
            // .field('name', 'my awesome avatar')
            .set('Accept', 'application/json')
            .expect(201)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.be.object;
                id = res.body.id;
                done();
            });
    });


    it('animals#index', function (done) {
        request(app)
            .get('/animals')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                res.body.should.be.array;
                done();
            });
    });

    it('animals#count', function (done) {
        request(app)
            .get('/animals/count')
            // .field('name', 'my awesome avatar')
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.be.object;
                res.body.should.be.have.property('count');
                done();
            });
    });

    it('animals#show', function (done) {
        request(app)
            .get('/animals/' + id)
            .set('Accept', 'application/json')
            .expect(200)
            .end(function (err, res) {
                if (err) return done(err);
                res.body.should.be.object;
                animal = res.body;
                done();
            });
    });

    it('animals#update', function (done) {
        request(app)
            .put('/animals/' + id)
            .set('Accept', 'application/json')
            // .field('name', 'my awesome avatar')
            .expect(200)
            .end(function(err, res){
                if (err) return done(err);
                res.body.should.be.object;
                done();
            });
    });

    it('animals#delete', function (done) {
        request(app)
            .delete('/animals/' + id)
            .set('Accept', 'application/json')
            .expect(204)
            .end(function(err, res){
                if (err) return done(err);
                res.body.should.be.object;
                done();
            });
    });

    it('animals#deleteAll', function (done) {
        request(app)
            .delete('/animals/truncate')
            .set('Accept', 'application/json')
            .expect(204)
            .end(function(err, res){
                if (err) return done(err);
                res.body.should.be.object;
                done();
            });
    });

});
