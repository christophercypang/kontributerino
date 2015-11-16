angular.module('kontribute.authFactory', [])
	.factory('authFactory', function($firebaseAuth, FirebaseUrl) {

		var ref = new Firebase(FirebaseUrl);
		var auth = $firebaseAuth(ref);

		return auth;

	});