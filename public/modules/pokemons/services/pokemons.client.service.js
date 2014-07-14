'use strict';

//Pokemons service used to communicate Pokemons REST endpoints
angular.module('pokemons').factory('Pokemons', ['$resource',
	function($resource) {
		return $resource('pokemons/:pokemonId', { pokemonId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);