angular.module('storerService', ['ngFileUpload'])

.factory('Pictures', function($http, $timeout, Upload) {
	return {
		get: function() {
			return $http.get('/api/pictures');
		},
		getPicture: function(id) {
			return $http.get('/api/picture/'+id);
		},
		uploadPicture: function(file) {
			file.upload = Upload.upload({
				url: '/api/pictures',
				arrayKey: '', // from http://stackoverflow.com/questions/32917617/multer-not-accepting-files-in-array-format-gives-unexpected-filed-error
				data: {files:file}
			});

			file.upload.then(function (response) {
		      $timeout(function () {
		        file.result = response.data;
		      });
		    },
		    function (response) {
		      if (response.status > 0) {
		      	console.error(response.status + ': ' + response.data);
		        $scope.errorMsg = response.status + ': ' + response.data;
		      }
		    },
		    function (evt) {
		      // Math.min is to fix IE which reports 200% sometimes
		      file.progress = Math.min(100, parseInt(100.0 * evt.loaded / evt.total));
		    });

		    file.upload.xhr(function (xhr) {
		      // xhr.upload.addEventListener('abort', function(){console.log('abort complete')}, false);
		    });

		    return file.upload;
		},
		addComment: function(id, data) {
			data.id = id;
			return $http.post('/api/pictures/comment', data);
		},
		deletePicture: function(id) {
			return $http.delete('/api/pictures/'+id);
		}
	}
})