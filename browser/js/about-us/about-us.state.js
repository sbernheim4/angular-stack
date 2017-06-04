'use strict';

// Register a state called timer
app.config(function($stateProvider) {
	$stateProvider.state('about-us', {
		url: '/about-us',
		templateUrl: 'js/about-us/about-us.template.min.html',
		controller: 'AboutCtrl'
	});
});
