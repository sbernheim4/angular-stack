'use strict'

app.config(function ($stateProvider) {
	$stateProvider.state('timer', {
		url: '/timer',
		templateUrl: 'js/timer/timer.template.html',
		controller: 'TimerCtrl'
	});
});
