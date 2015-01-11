'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var somethingnews = require('../../app/controllers/somethingnews');

	// Somethingnews Routes
	app.route('/somethingnews')
		.get(somethingnews.list)
		.post(users.requiresLogin, somethingnews.create);

	app.route('/somethingnews/:somethingnewId')
		.get(somethingnews.read)
		.put(users.requiresLogin, somethingnews.hasAuthorization, somethingnews.update)
		.delete(users.requiresLogin, somethingnews.hasAuthorization, somethingnews.delete);

	// Finish by binding the Somethingnew middleware
	app.param('somethingnewId', somethingnews.somethingnewByID);
};