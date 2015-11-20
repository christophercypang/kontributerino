angular.module('kontribute.usersFactory', [])
	.factory('usersFactory', function($firebaseArray, $firebaseObject, FirebaseUrl, $http){
		var usersRef = new Firebase(FirebaseUrl+'users');
		var users = $firebaseArray(usersRef);

		var factory = {};

		factory.getProfile = function(uid){
			return $firebaseObject(usersRef.child(uid));
		}

		factory.createUser = function(uid, email, password, name) {
			usersRef.child(uid).set({
				'email': email,
				'password': password,
				'name': name
			});
		}

		factory.getUser = function(uid) {
			var url = 'https://torrid-torch-6578.firebaseio.com/users/'+uid+".json";
			return $http.get(url)
			.success(function(data, status, headers, config){
				console.log(data);
			});
		}



		return factory;

	});