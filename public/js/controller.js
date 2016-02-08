angular.module('storerController', ['ngRoute'])

.controller('mainController', function($scope, $routeParams, $http, $location, Pictures) {
	var sctrl = this;

	$scope.formData = {};
	$scope.loading = true;

	function setLocation(path) {
		if (history.pushState) {
			$location.path(path);
		}
	}

	Pictures.get().then(function(response) {
		$scope.loading = false;
		$scope.pictures = response.data;
	})

	$routeParams.pictureId &&
	Pictures.getPicture($routeParams.pictureId).then(function(response) {
		$scope.loading = false;
		$scope.picture = response.data;

		console.log($scope.picture);
	})

	$scope.uploadPicture = function() {
		$scope.loading = true;
		Pictures.uploadPicture($scope.formData).then(function(response) {
			$scope.loading = false;
			$scope.formData = {};
			$scope.pictures = response.data;
		})
	}

	$scope.deletePicture = function(id) {
		$scope.loading = true;
		Pictures.deletePicture(id).then(function(response) {
			$scope.loading = false;
			$scope.pictures = data;
		})
	}
})
.controller('pictureController', function($scope, $routeParams, $http, $location, Pictures) {
	var sctrl = this;

	$scope.formData = {};
	$scope.loading = true;

	function setLocation(path) {
		if (history.pushState) {
			$location.path(path);
		}
	}

	$routeParams.pictureId &&
	Pictures.getPicture($routeParams.pictureId).then(function(response) {
		$scope.loading = false;
		$scope.picture = response.data;
	})

	$scope.addComment = function(id) {
		$scope.loading = true;
		Pictures.addComment(id, $scope.formData).then(function(response) {
			$scope.loading = false;
			$scope.formData = {};
			$scope.picture = response.data;
		})
	}
})