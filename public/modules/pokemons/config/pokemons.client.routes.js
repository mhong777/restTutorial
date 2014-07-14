'use strict';

//Setting up route
angular.module('pokemons').config(['$stateProvider',
	function($stateProvider) {
		// Pokemons state routing
		$stateProvider.
		state('listPokemons', {
			url: '/pokemons',
			templateUrl: 'modules/pokemons/views/list-pokemons.client.view.html'
		}).
		state('createPokemon', {
			url: '/pokemons/create',
			templateUrl: 'modules/pokemons/views/create-pokemon.client.view.html'
		}).
		state('viewPokemon', {
			url: '/pokemons/:pokemonId',
			templateUrl: 'modules/pokemons/views/view-pokemon.client.view.html'
		}).
		state('editPokemon', {
			url: '/pokemons/:pokemonId/edit',
			templateUrl: 'modules/pokemons/views/edit-pokemon.client.view.html'
		});
	}
]);