'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Somethingnew = mongoose.model('Somethingnew'),
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
				message = 'Somethingnew already exists';
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
 * Create a Somethingnew
 */
exports.create = function(req, res) {
	var somethingnew = new Somethingnew(req.body);
	somethingnew.user = req.user;

	somethingnew.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(somethingnew);
		}
	});
};

/**
 * Show the current Somethingnew
 */
exports.read = function(req, res) {
	res.jsonp(req.somethingnew);
};

/**
 * Update a Somethingnew
 */
exports.update = function(req, res) {
	var somethingnew = req.somethingnew ;

	somethingnew = _.extend(somethingnew , req.body);

	somethingnew.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(somethingnew);
		}
	});
};

/**
 * Delete an Somethingnew
 */
exports.delete = function(req, res) {
	var somethingnew = req.somethingnew ;

	somethingnew.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(somethingnew);
		}
	});
};

/**
 * List of Somethingnews
 */
exports.list = function(req, res) { Somethingnew.find().sort('-created').populate('user', 'displayName').exec(function(err, somethingnews) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(somethingnews);
		}
	});
};

/**
 * Somethingnew middleware
 */
exports.somethingnewByID = function(req, res, next, id) { Somethingnew.findById(id).populate('user', 'displayName').exec(function(err, somethingnew) {
		if (err) return next(err);
		if (! somethingnew) return next(new Error('Failed to load Somethingnew ' + id));
		req.somethingnew = somethingnew ;
		next();
	});
};

/**
 * Somethingnew authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.somethingnew.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};