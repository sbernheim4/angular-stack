'use strict';

app.controller('HomeCtrl', function($scope) {

	$scope.playAudio = function() {
		var audio = new Audio('../../audio.mp3');
		audio.load();
		audio.play();
	};

	$scope.playAudio();

});
