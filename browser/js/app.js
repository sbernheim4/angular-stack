'use strict'

// Register the angular app
var app = angular.module('APP_NAME_HERE', ['ui.router']);

app.config(function($locationProvider) {
	// allow for real urls and not hashbang urls --> EX: /timer instead of /#timer
	$locationProvider.html5Mode(true);
});
