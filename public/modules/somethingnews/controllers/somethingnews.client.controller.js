'use strict';

// Somethingnews controller
angular.module('somethingnews').controller('SomethingnewsController', ['$scope', '$stateParams', '$location', 'Authentication', 'Somethingnews',
	function($scope, $stateParams, $location, Authentication, Somethingnews ) {
		$scope.authentication = Authentication;

		// Create new Somethingnew
		$scope.create = function() {
			// Create new Somethingnew object
			var somethingnew = new Somethingnews ({
				name: this.name
			});

			// Redirect after save
			somethingnew.$save(function(response) {
				$location.path('somethingnews/' + response._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});

			// Clear form fields
			this.name = '';
		};

		// Remove existing Somethingnew
		$scope.remove = function( somethingnew ) {
			if ( somethingnew ) { somethingnew.$remove();

				for (var i in $scope.somethingnews ) {
					if ($scope.somethingnews [i] === somethingnew ) {
						$scope.somethingnews.splice(i, 1);
					}
				}
			} else {
				$scope.somethingnew.$remove(function() {
					$location.path('somethingnews');
				});
			}
		};

		// Update existing Somethingnew
		$scope.update = function() {
			var somethingnew = $scope.somethingnew ;

			somethingnew.$update(function() {
				$location.path('somethingnews/' + somethingnew._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Somethingnews
		$scope.find = function() {
			$scope.somethingnews = Somethingnews.query();
		};

		// Find existing Somethingnew
		$scope.findOne = function() {
			$scope.somethingnew = Somethingnews.get({ 
				somethingnewId: $stateParams.somethingnewId
			});
		};
	}
]);