'use strict';

//Enemypokemons service used to communicate Enemypokemons REST endpoints
angular.module('enemypokemons').factory('Enemypokemons', ['$resource',
	function($resource) {
		return $resource('enemypokemons/:enemypokemonId', { enemypokemonId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);