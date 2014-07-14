'use strict';

// Enemypokemons controller
angular.module('enemypokemons').controller('EnemypokemonsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Enemypokemons',
	function($scope, $stateParams, $location, Authentication, Enemypokemons ) {
		$scope.authentication = Authentication;

		// Create new Enemypokemon
		$scope.create = function() {
			// Create new Enemypokemon object
			var enemypokemon = new Enemypokemons ({
				name: this.name
			});

			// Redirect after save
			enemypokemon.$save(function(response) {
				$location.path('enemypokemons/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Enemypokemon
		$scope.remove = function( enemypokemon ) {
			if ( enemypokemon ) { enemypokemon.$remove();

				for (var i in $scope.enemypokemons ) {
					if ($scope.enemypokemons [i] === enemypokemon ) {
						$scope.enemypokemons.splice(i, 1);
					}
				}
			} else {
				$scope.enemypokemon.$remove(function() {
					$location.path('enemypokemons');
				});
			}
		};

		// Update existing Enemypokemon
		$scope.update = function() {
			var enemypokemon = $scope.enemypokemon ;

			enemypokemon.$update(function() {
				$location.path('enemypokemons/' + enemypokemon._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Enemypokemons
		$scope.find = function() {
			$scope.enemypokemons = Enemypokemons.query();
		};

		// Find existing Enemypokemon
		$scope.findOne = function() {
			$scope.enemypokemon = Enemypokemons.get({ 
				enemypokemonId: $stateParams.enemypokemonId
			});
		};
	}
]);