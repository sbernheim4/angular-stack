'use strict';

// Register a state called timer
app.config(function($stateProvider) {
	$stateProvider.state('timer', {
		url: '/timers',
		templateUrl: 'js/timer/timer.template.html',
		controller: 'TimerCtrl'
	});
});
