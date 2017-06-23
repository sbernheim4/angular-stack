'use strict'

// Register the angular app
let app = angular.module('APP_NAME_HERE', ['ui.router']);

app.config(function($locationProvider, $urlRouterProvider) {
	// allow for real urls and not hashbang urls --> EX: /timer instead of /#timer
	$locationProvider.html5Mode(true);

	// If no valid state is found, redirect the user to a 404 page
	$urlRouterProvider.otherwise('/404');
});
