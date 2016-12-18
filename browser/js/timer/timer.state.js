'use strict'

app.config(function ($stateProvider) {
	$stateProvider.state('timer', {
		url: '/',
		templateUrl: 'js/timer/timer.template.html',
		controller: 'TimerCtrl'
	});
});
