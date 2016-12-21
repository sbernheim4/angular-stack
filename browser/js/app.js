'use strict'
var app = angular.module('PomodoroTimer', []);

app.controller('MainCtrl', function($scope) {
	console.log('testing 1 2 3');
	$scope.message = 'THIS IS AN ANGULAR MESSAGE';
});

app.config(function($locationProvider) {
	$locationProvider.html5Mode(true);
});
