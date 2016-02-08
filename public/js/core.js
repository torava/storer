angular.module('storerApp', ['storerController', 'storerService'])
.config(function($routeProvider, $locationProvider) {
	$routeProvider
	.when('/picture/:pictureId', {
		templateUrl: 'partials/main.html',
		controller: 'mainController'
	})
	.otherwise({
		templateUrl: 'partials/main.html',
		controller: 'mainController'
	})
	$locationProvider.html5Mode(true);
});