/**
 *  Animal Integration Test
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

describe('Animal model:', function () {
    'use strict';
    var id;

    before(function (done) {
        schema.autoupdate(done);
    });

    after(function (done) {
        Animal.destroyAll(done);
    });

    it('#create', function (done) {
        Animal.create(function (err, created) {
            should.not.exist(err);
            created.should.be.have.property('id');
            created.id.should.not.eql(null);
            id = created.id;
            done();
        });
    });

    it('#exists', function (done) {
        Animal.exists(id, function (err, exists) {
            should.not.exist(err);
            exists.should.be.true;
            done();
        });
    });

    it('#findById', function (done) {
        Animal.findById(id, function (err, found) {
            should.not.exist(err);
            found.id.should.eql(id);
            done();
        });
    });

    it('#findOne', function (done) {
        Animal.findOne({
            where: {
                id: id
            }
        }, function (err, found) {
            should.not.exist(err);
            found.id.should.eql(id);
            done();
        });
    });

    it('#find', function (done) {
        Animal.find({}, function (err, founds) {
            should.not.exist(err);
            founds.should.length(1);
            done();
        });
    });

    it('#all', function (done) {
        Animal.all({}, function (err, founds) {
            should.not.exist(err);
            founds.should.length(1);
            done();
        });
    });

    it('#count', function (done) {
        Animal.count({}, function (err, count) {
            should.not.exist(err);
            count.should.eql(1);
            done();
        });
    });

    it('#destroyById', function (done) {
        Animal.destroyById(id, function (err) {
            should.not.exist(err);
            Animal.findById(id, function (err, found) {
                should.not.exist(err);
                should.not.exist(found);
                done();
            });
        });
    });

    it('#destroyAll', function (done) {
        Animal.destroyAll(function (err) {
            should.not.exist(err);
            Animal.find({}, function (err, founds) {
                should.not.exist(err);
                founds.should.length(0);
                done();
            });
        });
    });
/*
    describe('properties methods:', function () {

        it('#toString', function () {
            Animal.should.be.have.property('toString');
            Animal.toString.should.be.type('function');
        });

        it('#forEachProperty', function () {
            Animal.should.be.have.property('forEachProperty');
            Animal.forEachProperty.should.be.type('function');
        });

        it('#registerProperty', function () {
            Animal.should.be.have.property('registerProperty');
            Animal.registerProperty.should.be.type('function');
        });

    });

    describe('scope methods:', function () {

        it('#scope', function () {
            Animal.should.be.have.property('scope');
            Animal.scope.should.be.type('function');
        });

    });

    describe('query methods:', function () {

        it('#create', function () {
            Animal.should.be.have.property('create');
            Animal.create.should.be.type('function');
        });

        it('#exists', function () {
            Animal.should.be.have.property('exists');
            Animal.exists.should.be.type('function');
        });

        it('#count', function () {
            Animal.should.be.have.property('count');
            Animal.count.should.be.type('function');
        });

        it('#findOrCreate', function () {
            Animal.should.be.have.property('findOrCreate');
            Animal.findOrCreate.should.be.type('function');
        });

        it('#findById', function () {
            Animal.should.be.have.property('findById');
            Animal.findById.should.be.type('function');
        });

        it('#findOne', function () {
            Animal.should.be.have.property('findOne');
            Animal.findOne.should.be.type('function');
        });

        it('#find', function () {
            Animal.should.be.have.property('find');
            Animal.find.should.be.type('function');
        });

        it('#all', function () {
            Animal.should.be.have.property('all');
            Animal.all.should.be.type('function');
        });

        it('#run', function () {
            Animal.should.be.have.property('run');
            Animal.run.should.be.type('function');
        });

        it('#exec', function () {
            Animal.should.be.have.property('exec');
            Animal.exec.should.be.type('function');
        });

        it('#update', function () {
            Animal.should.be.have.property('update');
            Animal.update.should.be.type('function');
        });

        it('#updateOrCreate', function () {
            Animal.should.be.have.property('updateOrCreate');
            Animal.updateOrCreate.should.be.type('function');
        });

        it('#upsert', function () {
            Animal.should.be.have.property('upsert');
            Animal.upsert.should.be.type('function');
        });

        it('#destroyAll', function () {
            Animal.should.be.have.property('destroyAll');
            Animal.destroyAll.should.be.type('function');
        });

        it('#destroyById', function () {
            Animal.should.be.have.property('destroyById');
            Animal.destroyById.should.be.type('function');
        });

        it('#remove', function () {
            Animal.should.be.have.property('remove');
            Animal.remove.should.be.type('function');
        });

    });

    describe('relations methods:', function () {
        it('#hasMany', function () {
            Animal.should.be.have.property('hasMany');
            Animal.hasMany.should.be.type('function');
        });
        it('#belongsTo', function () {
            Animal.should.be.have.property('belongsTo');
            Animal.hasMany.should.be.type('function');
        });
    });

    describe('validations methods:', function () {

        it('#validate', function () {
            Animal.should.be.have.property('validate');
            Animal.validate.should.be.type('function');
        });

        it('#validatesPresenceOf', function () {
            Animal.should.be.have.property('validatesPresenceOf');
            Animal.validatesPresenceOf.should.be.type('function');
        });

        it('#validatesLengthOf', function () {
            Animal.should.be.have.property('validatesLengthOf');
            Animal.validatesLengthOf.should.be.type('function');
        });

        it('#validatesNumericalityOf', function () {
            Animal.should.be.have.property('validatesNumericalityOf');
            Animal.validatesNumericalityOf.should.be.type('function');
        });

        it('#validatesInclusionOf', function () {
            Animal.should.be.have.property('validatesInclusionOf');
            Animal.validatesInclusionOf.should.be.type('function');
        });

        it('#validatesInclusionOf', function () {
            Animal.should.be.have.property('validatesInclusionOf');
            Animal.validatesInclusionOf.should.be.type('function');
        });

        it('#validatesFormatOf', function () {
            Animal.should.be.have.property('validatesFormatOf');
            Animal.validatesFormatOf.should.be.type('function');
        });

        it('#validatesUniquenessOf', function () {
            Animal.should.be.have.property('validatesUniquenessOf');
            Animal.validatesUniquenessOf.should.be.type('function');
        });

        it('#validateAsync', function () {
            Animal.should.be.have.property('validateAsync');
            Animal.validateAsync.should.be.type('function');
        });

    });

    describe('hook methods:', function () {

        it('#afterInitialize', function () {
            Animal.should.be.have.property('afterInitialize');
            // Animal.afterInitialize.should.be.type('function');
        });

        it('#beforeValidation', function () {
            Animal.should.be.have.property('beforeValidation');
            // Animal.afterInitialize.should.be.type('function');
        });

        it('#afterValidation', function () {
            Animal.should.be.have.property('afterValidation');
        });

        it('#beforeSave', function () {
            Animal.should.be.have.property('beforeSave');
        });

        it('#afterSave', function () {
            Animal.should.be.have.property('afterSave');
        });

        it('#beforeCreate', function () {
            Animal.should.be.have.property('beforeCreate');
        });

        it('#afterCreate', function () {
            Animal.should.be.have.property('afterCreate');
        });

        it('#beforeUpdate', function () {
            Animal.should.be.have.property('beforeUpdate');
        });

        it('#afterUpdate', function () {
            Animal.should.be.have.property('afterUpdate');
        });

        it('#beforeDestroy', function () {
            Animal.should.be.have.property('beforeDestroy');
        });

        it('#afterDestroy', function () {
            Animal.should.be.have.property('afterDestroy');
        });
    });
*/
});
