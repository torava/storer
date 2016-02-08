angular.module('storerService', [])

.factory('Pictures', ['$http', function($http) {
	return {
		get: function() {
			return $http.get('/api/pictures');
		},
		getPicture: function(id) {
			return $http.get('/api/picture/'+id);
		},
		uploadPicture: function(data) {
			return $http.post('/api/pictures', data);
		},
		addComment: function(id, data) {
			data.id = id;
			return $http.post('/api/pictures/comment', data);
		},
		deletePicture: function(id) {
			return $http.delete('/api/pictures/'+id);
		}
	}
}])