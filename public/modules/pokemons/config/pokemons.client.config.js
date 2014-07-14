'use strict';

// Configuring the Articles module
angular.module('pokemons').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Pokemons', 'pokemons', 'dropdown', '/pokemons(/create)?');
		Menus.addSubMenuItem('topbar', 'pokemons', 'List Pokemons', 'pokemons');
		Menus.addSubMenuItem('topbar', 'pokemons', 'New Pokemon', 'pokemons/create');
	}
]);