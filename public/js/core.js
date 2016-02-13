angular.module('storerApp', ['storerController', 'storerService'])
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
	.state('main', {
		url: '/',
		templateUrl: 'partials/main.html',
		controller: 'mainController'
	})
	.state('main.picture', {
		url: 'picture/:pictureId',

		controller: 'mainController'
	})
	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);


});

$(function() {	
	$(document).keydown(function(e) {
		console.log(e);
		if (e.which == 37) {
			$('.navigation.previous').click()
		}
		else if (e.which == 39) {
			$('.navigation.next').click()
		}
		else if (e.which == 27) {
			$('.close').click()
		}
	})
})