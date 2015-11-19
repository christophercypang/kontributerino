angular.module('kontribute.usersFactory', [])
	.factory('usersFactory', function($firebaseArray, $firebaseObject, FirebaseUrl, $http){
		var usersRef = new Firebase(FirebaseUrl+'users');
		var users = $firebaseArray(usersRef);

		var currentUser;

		var Users={
			getProfile: function(uid) {
				return $firebaseObject(usersRef.child(uid));
			},

			getDisplayName: function(uid){
				return users.$getRecord(uid).displayName;
			},

			getGravatar: function(uid){
				return '//www.gravatar.com/avatar/' + users.$getRecord(uid).emailHash;
			},

			setCurrentUser: function(uid){
				currentUser = uid;
				console.log("curr User:", currentUser);
			},

			getCurrentUser: function(){
				return currentUser;
			},	

			createUser: function(uid, email, password, name) {
				usersRef.child(uid).set({
					'email': email,
					'password': password,
					'name': name
				});
				
			},

			getUser: function(uid) {
				var url = "https://torrid-torch-6578.firebaseio.com/users" + uid + ".json";
				return $http.get(url)
				.success(function(data, status, headers, config) {
					console.log(data);
				});
			},

			all: users
		};

		return Users;



	});