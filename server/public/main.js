'use strict';

// Register the angular app

var app = angular.module('APP_NAME_HERE', ['ui.router']);

app.config(function ($locationProvider, $urlRouterProvider) {
	// allow for real urls and not hashbang urls --> EX: /timer instead of /#timer
	$locationProvider.html5Mode(true);

	// If no valid state is found, redirect the user to a 404 page
	$urlRouterProvider.otherwise('/404');
});

'use strict';

// Register a state called timer
app.config(function ($stateProvider) {
	$stateProvider.state('404', {
		url: '/404',
		templateUrl: 'js/404/404.template.min.html'
	});
});

'use strict';

app.controller('HomeCtrl', function ($scope) {});

'use strict';

// Register a state called timer
app.config(function ($stateProvider) {
	$stateProvider.state('home', {
		url: '/',
		templateUrl: 'js/home/home.template.min.html',
		controller: 'HomeCtrl'
	});
});

app.directive('navbar', function ($rootScope, $state) {

	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'js/navbar/navbar.template.min.html',

		link: function (scope) {

			scope.someVar = "BLAHHHH IS SOME VAR";
		}
	};
});