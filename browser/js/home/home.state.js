'use strict';

// Register a state called timer
app.config(function($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'js/home/home.template.min.html',
		controller: 'HomeCtrl'
	});
});
