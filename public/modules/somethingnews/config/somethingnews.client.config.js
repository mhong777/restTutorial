'use strict';

// Configuring the Articles module
angular.module('somethingnews').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Somethingnews', 'somethingnews', 'dropdown', '/somethingnews(/create)?');
		Menus.addSubMenuItem('topbar', 'somethingnews', 'List Somethingnews', 'somethingnews');
		Menus.addSubMenuItem('topbar', 'somethingnews', 'New Somethingnew', 'somethingnews/create');
	}
]);