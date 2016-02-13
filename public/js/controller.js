angular.module('storerController', ['ui.router', 'blueimp.fileupload'])
.run(['$location', '$rootElement', function ($location, $rootElement) {
      $rootElement.off('click');
}])
.controller('mainController', function($scope, $rootScope, $stateParams, $http, $location, Pictures) {
	var sctrl = this;

	$rootScope.$on('$stateChangeStart',
    function(event, toState, toParams, fromState, fromParams){
        $rootScope.isPictureShown = toState.name === 'main.picture';
        $rootScope.hideComments = $scope.hideComments;
    })

	$scope.upload_options = {url:'/api/pictures', previewCrop: true, previewMaxWidth:150, previewMaxHeight:150, singleFileUploads:false};

	Pictures.get().then(function(response) {
		$scope.loading = false;
		$scope.pictures = response.data;
	})

	$stateParams.pictureId &&
	Pictures.getPicture($stateParams.pictureId).then(function(response) {
		$scope.loading = false;
		$scope.picture = response.data;
	})

	$scope.deletePicture = function(id) {
		$scope.loading = true;
		Pictures.deletePicture(id).then(function(response) {
			$scope.loading = false;
			$scope.pictures = data;
		})
	}

	$scope.addComment = function(id) {
		$scope.loading = true;

		Pictures.addComment(id, $scope.formData).then(function(response) {
			$scope.loading = false;
			$scope.formData = {};
			$scope.picture = response.data;
		})
	}
})