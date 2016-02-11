angular.module('storerController', ['ui.router'])
.controller('mainController', function($scope, $stateParams, $http, $location, Pictures) {
	var sctrl = this;

	$scope.formData = {};
	$scope.loading = true;
	$scope.picture = null;

	$scope.$watch('files', function (files) {
    $scope.formUpload = false;
    if (files != null) {
      if (!angular.isArray(files)) {
        $timeout(function () {
          $scope.files = files = [files];
        });
        return;
      }
      for (var i = 0; i < files.length; i++) {
        $scope.errorMsg = null;
        (function (f) {
          $scope.uploadPicture(f);
        })(files[i]);
      }
    }
  });

	function setLocation(path) {
		if (history.pushState) {
			$location.path(path);
		}
	}

	Pictures.get().then(function(response) {
		$scope.loading = false;
		$scope.pictures = response.data;
	})

	$stateParams.pictureId &&
	Pictures.getPicture($stateParams.pictureId).then(function(response) {
		$scope.loading = false;
		$scope.picture = response.data;
	})

	$scope.uploadPicture = function(files) {
		$scope.loading = true;
		Pictures.uploadPicture(files).then(function(response) {
			$scope.loading = false;
			$scope.formData = {};
			$scope.pictures = response.data;
			$scope.files = null;
		})
	}

	$scope.deletePicture = function(id) {
		$scope.loading = true;
		Pictures.deletePicture(id).then(function(response) {
			$scope.loading = false;
			$scope.pictures = data;
		})
	}

	$scope.addComment = function(id) {
		$scope.loading = true;
		console.log('hmm');

		Pictures.addComment(id, $scope.formData).then(function(response) {
			$scope.loading = false;
			$scope.formData = {};
			$scope.picture = response.data;
		})
	}
})
.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
	$stateProvider
	.state('main', {
		url: '/',
		templateUrl: 'partials/main.html',
		controller: 'mainController'
	})
	.state('main.picture', {
		url: 'picture/:pictureId',
		templateUrl: 'partials/picture.html',
		controller: 'mainController'
	})
	$urlRouterProvider.otherwise('/');
	$locationProvider.html5Mode(true);
});