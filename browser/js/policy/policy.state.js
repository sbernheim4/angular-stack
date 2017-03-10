'use strict';

// Register a state called timer
app.config(function($stateProvider) {
	$stateProvider.state('policy', {
		url: '/policy',
		templateUrl: 'js/policy/policy.template.min.html'
	});
});
