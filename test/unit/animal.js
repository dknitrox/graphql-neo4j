/**
 *  Animal Unit Test
 *  Created by caminte-cli script
 **/

if (!process.env.NODE_ENV) {
    process.env.NODE_ENV = 'test';
}

var should = require('should');
var caminte = require('caminte');
var config = require('../../database');
var dbConf = config[process.env.NODE_ENV];
var AnimalModel = require('../../models/AnimalModel');
var Schema = caminte.Schema;
dbConf.host = process.env.DB_HOST || dbConf.host;
var schema = new Schema(dbConf.driver, dbConf);
var Animal = AnimalModel(schema);

/**
 * Simple tests for the Article model
 */
describe('Animal unit:', function () {
    'use strict';
    var animal, id;

    before(function (done) {
        schema.autoupdate(done);
    });

    after(function (done) {
        Animal.destroyAll(done);
    });

    describe('create', function () {

        animal = new Animal();
        it('animal should be object', function () {
            animal.should.be.type('object');
        });

        it('validate', function (done) {
            animal.isValid(function (valid) {
                valid.should.be.true;
                if (!valid) console.log(animal.errors);
                done();
            });
        });

    });

    describe('save', function () {

        it('should be have #save', function () {
            animal.should.be.have.property('save');
            animal.save.should.be.type('function');
        });

        it('call', function (done) {
            animal.save(function (err) {
                should.not.exist(err);
                animal.should.be.have.property('id');
                animal.id.should.not.eql(null);
                id = animal.id;
                done();
            });
        });

    });

    describe('destroy', function () {

        it('should be have #destroy', function () {
            animal.should.be.have.property('destroy');
            animal.destroy.should.be.type('function');
        });

        it('call', function (done) {
            animal.destroy(function (err) {
                should.not.exist(err);
                done();
            });
        });

    });

});
