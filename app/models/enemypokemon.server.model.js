'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Enemypokemon Schema
 */
var EnemypokemonSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Enemypokemon name',
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

mongoose.model('Enemypokemon', EnemypokemonSchema);