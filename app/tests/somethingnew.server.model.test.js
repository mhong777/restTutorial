'use strict';

/**
 * Module dependencies.
 */
var should = require('should'),
	mongoose = require('mongoose'),
	User = mongoose.model('User'),
	Somethingnew = mongoose.model('Somethingnew');

/**
 * Globals
 */
var user, somethingnew;

/**
 * Unit tests
 */
describe('Somethingnew Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() { 
			somethingnew = new Somethingnew({
				name: 'Somethingnew Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return somethingnew.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) { 
			somethingnew.name = '';

			return somethingnew.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) { 
		Somethingnew.remove().exec();
		User.remove().exec();

		done();
	});
});