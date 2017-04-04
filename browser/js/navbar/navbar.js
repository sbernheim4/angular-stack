app.directive('navbar', function($rootScope, $state) {

	return {
		restrict: 'E',
		scope: {},
		templateUrl: 'js/navbar/navbar.template.min.html',

		link: function (scope) {
			scope.someVar = "BLAHHHH IS SOME VAR";
		}
	};
});
