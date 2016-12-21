'use strict';

// Register a state called timer
app.config(function($stateProvider) {
	$stateProvider.state('timer', {
		url: '/timer',
		// TODO: Figure out how to actually load the html file
		templateUrl: 'js/timer/timer.template.html',
		controller: 'TimerCtrl'
	});
});
