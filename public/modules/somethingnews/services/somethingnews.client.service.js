'use strict';

//Somethingnews service used to communicate Somethingnews REST endpoints
angular.module('somethingnews').factory('Somethingnews', ['$resource',
	function($resource) {
		return $resource('somethingnews/:somethingnewId', { somethingnewId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
	}
]);