'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var pokemons = require('../../app/controllers/pokemons');

	// Pokemons Routes
	app.route('/pokemons')
		.get(pokemons.list)
		.post(users.requiresLogin, pokemons.create);

	app.route('/pokemons/:pokemonId')
		.get(pokemons.read)
		.put(users.requiresLogin, pokemons.hasAuthorization, pokemons.update)
		.delete(users.requiresLogin, pokemons.hasAuthorization, pokemons.delete);
    
    app.route('/createFromJson')
        .post(pokemons.createFromJson);

    app.route('/getname/:pokeName')
        .get(pokemons.getByName);
    
    app.route('/updatename/:pokeName')
        .put(pokemons.updateName);

    
	// Finish by binding the Pokemon middleware
	app.param('pokemonId', pokemons.pokemonByID);
};