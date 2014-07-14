'use strict';

//Setting up route
angular.module('enemypokemons').config(['$stateProvider',
	function($stateProvider) {
		// Enemypokemons state routing
		$stateProvider.
		state('listEnemypokemons', {
			url: '/enemypokemons',
			templateUrl: 'modules/enemypokemons/views/list-enemypokemons.client.view.html'
		}).
		state('createEnemypokemon', {
			url: '/enemypokemons/create',
			templateUrl: 'modules/enemypokemons/views/create-enemypokemon.client.view.html'
		}).
		state('viewEnemypokemon', {
			url: '/enemypokemons/:enemypokemonId',
			templateUrl: 'modules/enemypokemons/views/view-enemypokemon.client.view.html'
		}).
		state('editEnemypokemon', {
			url: '/enemypokemons/:enemypokemonId/edit',
			templateUrl: 'modules/enemypokemons/views/edit-enemypokemon.client.view.html'
		});
	}
]);