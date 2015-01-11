'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Pokemon = mongoose.model('Pokemon'),
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
				message = 'Pokemon already exists';
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
 * Create a Pokemon
 */
exports.create = function(req, res) {
	var pokemon = new Pokemon(req.body);
	pokemon.user = req.user;

	pokemon.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(pokemon);
		}
	});
};

/**
*Create a Pokemon from Json
**/
exports.createFromJson=function(req,res){
//    res.send(req.body.name);
    var pokemon = new Pokemon({
        name:req.body.name,
        atk:req.body.atk,
        def:req.body.def,
        hp:req.body.hp,
        currHp:req.body.hp
    });
	pokemon.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(pokemon);
		}
	});
    //res.send('this works!');  
};

/**
*Get a Pokemon by Name
**/
exports.getByName=function(req,res){    
    var pokeName=req.params.pokeName;
    Pokemon.find({'name': pokeName}).exec(function(err, pokemons){
        if(err){
            res.send(err);
        }
        else{
            var pokemon = pokemons[0];
            res.jsonp(pokemon);
        }
    });      
};


/**
*Update the Name
**/
exports.updateName=function(req,res){
    var pokeName=req.params.pokeName;
    Pokemon.find({'name': pokeName}).exec(function(err, pokemons){
        if(err){
            res.send(err);
        }
        else{
            var pokemon = pokemons[0];
            pokemon.name='something';
            pokemon.save(function(err) {
                if (err) {
                    return res.send(400, {
                        message: getErrorMessage(err)
                    });
                } else {
                    res.jsonp(pokemon);
                }
            });
        }
    });      
};

/**
 * Show the current Pokemon
 */
exports.read = function(req, res) {
	res.jsonp(req.pokemon);
};

/**
*test function
**/
exports.testFunction=function(req,res){
    res.send('this works!');  
};

/**
 * Update a Pokemon
 */
exports.update = function(req, res) {
	var pokemon = req.pokemon ;

	pokemon = _.extend(pokemon , req.body);

	pokemon.save(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(pokemon);
		}
	});
};

/**
 * Delete an Pokemon
 */
exports.delete = function(req, res) {
	var pokemon = req.pokemon ;

	pokemon.remove(function(err) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(pokemon);
		}
	});
};

/**
 * List of Pokemons
 */
exports.list = function(req, res) { Pokemon.find().sort('-created').populate('user', 'displayName').exec(function(err, pokemons) {
		if (err) {
			return res.send(400, {
				message: getErrorMessage(err)
			});
		} else {
			res.jsonp(pokemons);
		}
	});
};

/**
 * Pokemon middleware
 */
exports.pokemonByID = function(req, res, next, id) { Pokemon.findById(id).populate('user', 'displayName').exec(function(err, pokemon) {
		if (err) return next(err);
		if (! pokemon) return next(new Error('Failed to load Pokemon ' + id));
		req.pokemon = pokemon ;
		next();
	});
};

/**
 * Pokemon authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.pokemon.user.id !== req.user.id) {
		return res.send(403, 'User is not authorized');
	}
	next();
};