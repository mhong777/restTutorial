'use strict';

(function() {
	// Somethingnews Controller Spec
	describe('Somethingnews Controller Tests', function() {
		// Initialize global variables
		var SomethingnewsController,
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

			// Initialize the Somethingnews controller.
			SomethingnewsController = $controller('SomethingnewsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Somethingnew object fetched from XHR', inject(function(Somethingnews) {
			// Create sample Somethingnew using the Somethingnews service
			var sampleSomethingnew = new Somethingnews({
				name: 'New Somethingnew'
			});

			// Create a sample Somethingnews array that includes the new Somethingnew
			var sampleSomethingnews = [sampleSomethingnew];

			// Set GET response
			$httpBackend.expectGET('somethingnews').respond(sampleSomethingnews);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.somethingnews).toEqualData(sampleSomethingnews);
		}));

		it('$scope.findOne() should create an array with one Somethingnew object fetched from XHR using a somethingnewId URL parameter', inject(function(Somethingnews) {
			// Define a sample Somethingnew object
			var sampleSomethingnew = new Somethingnews({
				name: 'New Somethingnew'
			});

			// Set the URL parameter
			$stateParams.somethingnewId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/somethingnews\/([0-9a-fA-F]{24})$/).respond(sampleSomethingnew);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.somethingnew).toEqualData(sampleSomethingnew);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Somethingnews) {
			// Create a sample Somethingnew object
			var sampleSomethingnewPostData = new Somethingnews({
				name: 'New Somethingnew'
			});

			// Create a sample Somethingnew response
			var sampleSomethingnewResponse = new Somethingnews({
				_id: '525cf20451979dea2c000001',
				name: 'New Somethingnew'
			});

			// Fixture mock form input values
			scope.name = 'New Somethingnew';

			// Set POST response
			$httpBackend.expectPOST('somethingnews', sampleSomethingnewPostData).respond(sampleSomethingnewResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Somethingnew was created
			expect($location.path()).toBe('/somethingnews/' + sampleSomethingnewResponse._id);
		}));

		it('$scope.update() should update a valid Somethingnew', inject(function(Somethingnews) {
			// Define a sample Somethingnew put data
			var sampleSomethingnewPutData = new Somethingnews({
				_id: '525cf20451979dea2c000001',
				name: 'New Somethingnew'
			});

			// Mock Somethingnew in scope
			scope.somethingnew = sampleSomethingnewPutData;

			// Set PUT response
			$httpBackend.expectPUT(/somethingnews\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/somethingnews/' + sampleSomethingnewPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid somethingnewId and remove the Somethingnew from the scope', inject(function(Somethingnews) {
			// Create new Somethingnew object
			var sampleSomethingnew = new Somethingnews({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Somethingnews array and include the Somethingnew
			scope.somethingnews = [sampleSomethingnew];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/somethingnews\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSomethingnew);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.somethingnews.length).toBe(0);
		}));
	});
}());