'use strict';

//Setting up route
angular.module('somethingnews').config(['$stateProvider',
	function($stateProvider) {
		// Somethingnews state routing
		$stateProvider.
		state('listSomethingnews', {
			url: '/somethingnews',
			templateUrl: 'modules/somethingnews/views/list-somethingnews.client.view.html'
		}).
		state('createSomethingnew', {
			url: '/somethingnews/create',
			templateUrl: 'modules/somethingnews/views/create-somethingnew.client.view.html'
		}).
		state('viewSomethingnew', {
			url: '/somethingnews/:somethingnewId',
			templateUrl: 'modules/somethingnews/views/view-somethingnew.client.view.html'
		}).
		state('editSomethingnew', {
			url: '/somethingnews/:somethingnewId/edit',
			templateUrl: 'modules/somethingnews/views/edit-somethingnew.client.view.html'
		});
	}
]);