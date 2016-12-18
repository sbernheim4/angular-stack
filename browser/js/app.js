'use strict';
var app = angular.module('PomodoroTimer', ['ui-router']);

app.config(function($stateProvider) {
	$stateProvider.state('home', {
		url: '/timer',
		template: '<p>Best Story Ever</p>'
	});
});
