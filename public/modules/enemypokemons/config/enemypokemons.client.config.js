'use strict';

// Configuring the Articles module
angular.module('enemypokemons').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Enemypokemons', 'enemypokemons', 'dropdown', '/enemypokemons(/create)?');
		Menus.addSubMenuItem('topbar', 'enemypokemons', 'List Enemypokemons', 'enemypokemons');
		Menus.addSubMenuItem('topbar', 'enemypokemons', 'New Enemypokemon', 'enemypokemons/create');
	}
]);