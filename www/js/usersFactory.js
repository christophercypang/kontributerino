angular.module('kontribute.usersFactory', [])
	.factory('usersFactory', function($firebaseArray, $firebaseObject, FirebaseUrl, $http, $q){
		var usersRef = new Firebase(FirebaseUrl+'users');
		var users = $firebaseArray(usersRef);

		var factory = {};

		factory.getProfile = function(uid){
			return $firebaseObject(usersRef.child(uid));
		}

		factory.createUser = function(uid, email, password, firstname, lastname) {
			usersRef.child(uid).set({
				'uid': uid,
				'email': email,
				'password': password,
				'firstname': firstname,
				'lastname': lastname, 
				'friends': 0
			});
		}


		factory.getUser = function(uid) {

			var url = 'https://torrid-torch-6578.firebaseio.com/users/'+uid+".json"

			return $http.get(url)
			.success(function(data, status, headers, config){
			//	console.log(data);
			});
		}


		factory.getAllUsers = function() {

			var url = 'https://torrid-torch-6578.firebaseio.com/users.json'

			return $http.get(url)
			.success(function(data){
				console.log(data);
			});

		}

		factory.getFriends = function(uid) {
			var url = 'https://torrid-torch-6578.firebaseio.com/users/'+uid+'/friends.json'
			return $http.get(url)
			.success(function(data){
				console.log(data);
			});
		}

		factory.addFriend = function(uid, friend, friendUid) {
		 	var url = 'https://torrid-torch-6578.firebaseio.com/users/'+uid+"/friends/"+ friendUid+ ".json"
		 	$http.patch(url, {friend: friend})
		 	.success(function(data){
		 		console.log("Added friend: ", data);
		 	}).
		 	error(function(data){
		 		("error");
		 	});
		 }

		 factory.removeFriend = function(uid, friendUid){
		 	var friendRef = new Firebase('https://torrid-torch-6578.firebaseio.com/users/'+uid+'/friends/'+friendUid);
		 	friendRef.remove();
		 	console.log('friend with uid: '+friendUid+' removed.');
		 }



		return factory;

	});