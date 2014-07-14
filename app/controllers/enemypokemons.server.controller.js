'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Enemypokemon = mongoose.model('Enemypokemon'),
	_ = require('lodash');

/**
 * Get the error message from error object
 */
var getErrorMessage = function(err) {
	var message = '';

	if (err.code) {
		switch (err.code) {
			case 11000:
			case 11001:
				message = 'Enemypokemon already exists';
				break;
			default:
				message = 'Something went wrong';
		}
	} else {
		for (var errName in err.errors) {
			if (err.errors[errName].message) message = err.errors[errName].message;
		}
	}

	return message;
};

/**
 * Create a Enemypokemon
 */
exports.create = function(req, res) {
	var enemypokemon = new Enemypokemon(req.body);
	enemypokemon.user = req.user;

	enemypokemon.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(enemypokemon);
		}
	});
};

/**
 * Show the current Enemypokemon
 */
exports.read = function(req, res) {
	res.jsonp(req.enemypokemon);
};

/**
 * Update a Enemypokemon
 */
exports.update = function(req, res) {
	var enemypokemon = req.enemypokemon ;

	enemypokemon = _.extend(enemypokemon , req.body);

	enemypokemon.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(enemypokemon);
		}
	});
};

/**
 * Delete an Enemypokemon
 */
exports.delete = function(req, res) {
	var enemypokemon = req.enemypokemon ;

	enemypokemon.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(enemypokemon);
		}
	});
};

/**
 * List of Enemypokemons
 */
exports.list = function(req, res) { Enemypokemon.find().sort('-created').populate('user', 'displayName').exec(function(err, enemypokemons) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(enemypokemons);
		}
	});
};

/**
 * Enemypokemon middleware
 */
exports.enemypokemonByID = function(req, res, next, id) { Enemypokemon.findById(id).populate('user', 'displayName').exec(function(err, enemypokemon) {
		if (err) return next(err);
		if (! enemypokemon) return next(new Error('Failed to load Enemypokemon ' + id));
		req.enemypokemon = enemypokemon ;
		next();
	});
};

/**
 * Enemypokemon authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.enemypokemon.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};