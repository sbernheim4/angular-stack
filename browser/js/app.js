'use strict'
var angular = require('angular');

var app = angular.module('PomodoroTimer', []);

app.controller('MainCtrl', function($scope) {
	$scope.message = 'THIS IS AN ANGULAR MESSAGE';
});

app.config(function($locationProvider) {
	$locationProvider.html5Mode(true);
});

module.exports = app;
