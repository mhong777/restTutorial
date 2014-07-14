'use strict';

(function() {
	// Pokemons Controller Spec
	describe('Pokemons Controller Tests', function() {
		// Initialize global variables
		var PokemonsController,
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

			// Initialize the Pokemons controller.
			PokemonsController = $controller('PokemonsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Pokemon object fetched from XHR', inject(function(Pokemons) {
			// Create sample Pokemon using the Pokemons service
			var samplePokemon = new Pokemons({
				name: 'New Pokemon'
			});

			// Create a sample Pokemons array that includes the new Pokemon
			var samplePokemons = [samplePokemon];

			// Set GET response
			$httpBackend.expectGET('pokemons').respond(samplePokemons);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pokemons).toEqualData(samplePokemons);
		}));

		it('$scope.findOne() should create an array with one Pokemon object fetched from XHR using a pokemonId URL parameter', inject(function(Pokemons) {
			// Define a sample Pokemon object
			var samplePokemon = new Pokemons({
				name: 'New Pokemon'
			});

			// Set the URL parameter
			$stateParams.pokemonId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/pokemons\/([0-9a-fA-F]{24})$/).respond(samplePokemon);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.pokemon).toEqualData(samplePokemon);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Pokemons) {
			// Create a sample Pokemon object
			var samplePokemonPostData = new Pokemons({
				name: 'New Pokemon'
			});

			// Create a sample Pokemon response
			var samplePokemonResponse = new Pokemons({
				_id: '525cf20451979dea2c000001',
				name: 'New Pokemon'
			});

			// Fixture mock form input values
			scope.name = 'New Pokemon';

			// Set POST response
			$httpBackend.expectPOST('pokemons', samplePokemonPostData).respond(samplePokemonResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Pokemon was created
			expect($location.path()).toBe('/pokemons/' + samplePokemonResponse._id);
		}));

		it('$scope.update() should update a valid Pokemon', inject(function(Pokemons) {
			// Define a sample Pokemon put data
			var samplePokemonPutData = new Pokemons({
				_id: '525cf20451979dea2c000001',
				name: 'New Pokemon'
			});

			// Mock Pokemon in scope
			scope.pokemon = samplePokemonPutData;

			// Set PUT response
			$httpBackend.expectPUT(/pokemons\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/pokemons/' + samplePokemonPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid pokemonId and remove the Pokemon from the scope', inject(function(Pokemons) {
			// Create new Pokemon object
			var samplePokemon = new Pokemons({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Pokemons array and include the Pokemon
			scope.pokemons = [samplePokemon];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/pokemons\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(samplePokemon);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.pokemons.length).toBe(0);
		}));
	});
}());