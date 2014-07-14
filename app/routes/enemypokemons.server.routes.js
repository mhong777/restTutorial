'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users');
	var enemypokemons = require('../../app/controllers/enemypokemons');

	// Enemypokemons Routes
	app.route('/enemypokemons')
		.get(enemypokemons.list)
		.post(users.requiresLogin, enemypokemons.create);

	app.route('/enemypokemons/:enemypokemonId')
		.get(enemypokemons.read)
		.put(users.requiresLogin, enemypokemons.hasAuthorization, enemypokemons.update)
		.delete(users.requiresLogin, enemypokemons.hasAuthorization, enemypokemons.delete);

	// Finish by binding the Enemypokemon middleware
	app.param('enemypokemonId', enemypokemons.enemypokemonByID);
};