'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Pokemon Schema
 */
var PokemonSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Pokemon name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
    atk:{
        type: Number,
        default:1
    },
    def:{
        type: Number,
        default:1
    },
    hp:{
        type: Number,
        default:10
    },
    currHp:{
        type: Number,
        default:10
    },
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Pokemon', PokemonSchema);