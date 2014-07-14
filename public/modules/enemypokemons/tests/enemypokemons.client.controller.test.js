'use strict';

(function() {
	// Enemypokemons Controller Spec
	describe('Enemypokemons Controller Tests', function() {
		// Initialize global variables
		var EnemypokemonsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Enemypokemons controller.
			EnemypokemonsController = $controller('EnemypokemonsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Enemypokemon object fetched from XHR', inject(function(Enemypokemons) {
			// Create sample Enemypokemon using the Enemypokemons service
			var sampleEnemypokemon = new Enemypokemons({
				name: 'New Enemypokemon'
			});

			// Create a sample Enemypokemons array that includes the new Enemypokemon
			var sampleEnemypokemons = [sampleEnemypokemon];

			// Set GET response
			$httpBackend.expectGET('enemypokemons').respond(sampleEnemypokemons);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.enemypokemons).toEqualData(sampleEnemypokemons);
		}));

		it('$scope.findOne() should create an array with one Enemypokemon object fetched from XHR using a enemypokemonId URL parameter', inject(function(Enemypokemons) {
			// Define a sample Enemypokemon object
			var sampleEnemypokemon = new Enemypokemons({
				name: 'New Enemypokemon'
			});

			// Set the URL parameter
			$stateParams.enemypokemonId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/enemypokemons\/([0-9a-fA-F]{24})$/).respond(sampleEnemypokemon);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.enemypokemon).toEqualData(sampleEnemypokemon);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Enemypokemons) {
			// Create a sample Enemypokemon object
			var sampleEnemypokemonPostData = new Enemypokemons({
				name: 'New Enemypokemon'
			});

			// Create a sample Enemypokemon response
			var sampleEnemypokemonResponse = new Enemypokemons({
				_id: '525cf20451979dea2c000001',
				name: 'New Enemypokemon'
			});

			// Fixture mock form input values
			scope.name = 'New Enemypokemon';

			// Set POST response
			$httpBackend.expectPOST('enemypokemons', sampleEnemypokemonPostData).respond(sampleEnemypokemonResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Enemypokemon was created
			expect($location.path()).toBe('/enemypokemons/' + sampleEnemypokemonResponse._id);
		}));

		it('$scope.update() should update a valid Enemypokemon', inject(function(Enemypokemons) {
			// Define a sample Enemypokemon put data
			var sampleEnemypokemonPutData = new Enemypokemons({
				_id: '525cf20451979dea2c000001',
				name: 'New Enemypokemon'
			});

			// Mock Enemypokemon in scope
			scope.enemypokemon = sampleEnemypokemonPutData;

			// Set PUT response
			$httpBackend.expectPUT(/enemypokemons\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/enemypokemons/' + sampleEnemypokemonPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid enemypokemonId and remove the Enemypokemon from the scope', inject(function(Enemypokemons) {
			// Create new Enemypokemon object
			var sampleEnemypokemon = new Enemypokemons({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Enemypokemons array and include the Enemypokemon
			scope.enemypokemons = [sampleEnemypokemon];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/enemypokemons\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleEnemypokemon);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.enemypokemons.length).toBe(0);
		}));
	});
}());