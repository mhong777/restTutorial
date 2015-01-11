'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Somethingnew Schema
 */
var SomethingnewSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Somethingnew name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Somethingnew', SomethingnewSchema);