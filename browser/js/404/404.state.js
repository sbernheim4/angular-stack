'use strict';

// Register a state called timer
app.config(function($stateProvider) {
	$stateProvider.state('404', {
		url: '/404',
		templateUrl: 'js/404/404.template.min.html'
	});
});
