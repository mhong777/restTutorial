'use strict';

// Pokemons controller
angular.module('pokemons').controller('PokemonsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Pokemons', '$http',
	function($scope, $stateParams, $location, Authentication, Pokemons, $http ) {
		$scope.authentication = Authentication;

		// Create new Pokemon
		$scope.create = function() {
			// Create new Pokemon object
			var pokemon = new Pokemons ({
				name: this.name
			});

			// Redirect after save
			pokemon.$save(function(response) {
				$location.path('pokemons/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Pokemon
		$scope.remove = function( pokemon ) {
			if ( pokemon ) { pokemon.$remove();

				for (var i in $scope.pokemons ) {
					if ($scope.pokemons [i] === pokemon ) {
						$scope.pokemons.splice(i, 1);
					}
				}
			} else {
				$scope.pokemon.$remove(function() {
					$location.path('pokemons');
				});
			}
		};

		// Update existing Pokemon
		$scope.update = function() {
			var pokemon = $scope.pokemon ;

			pokemon.$update(function() {
				$location.path('pokemons/' + pokemon._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Pokemons
		$scope.find = function() {
			$scope.pokemons = Pokemons.query();
		};

		// Find existing Pokemon
		$scope.findOne = function() {
			$scope.pokemon = Pokemons.get({ 
				pokemonId: $stateParams.pokemonId
			});
		};

        //create a pokemon from json
        $scope.createFromJson=function(){
            var reqBody={};  
            reqBody.name='onyx';
            reqBody.atk=7;
            reqBody.def=20;
            reqBody.hp=130;
            $http.get('http://localhost:3000/getname/psyduck',reqBody).
                success(function(data, status){
                    $scope.pokemon=data;
                    console.log(data);
                });              
        };
        
                 
        
        
        
        
	}
]);