angular.module('kontribute.authFactory', [])
	.factory('authFactory', function() {

	var factory = {};
	var vm = this; 
	vm.loggedIn; 


      factory.registerUser = function(userName, password, email, firstName, lastName){

		var ref = new Parse.User(); 
	  

		ref.set("username", userName); 
		ref.set("password", password); 
		ref.set("email", email); 

		ref.set("firstName", firstName); 
		ref.set("lastName", lastName); 

	return ref.signUp(null, { 
			success: function(user, message){
				vm.loggedIn = user; 
				
			}, 
			error: function(user, error){
				
			}
		}); 

		

	};



	 factory.loginUser = function(userName, password){
		console.log(userName, password + "in fac"); 
		Parse.User.logIn(userName, password, {	
			success: function(user){
				
			}, 
			error: function(user, error){
				console.log("error"); 
			}
		}); 

		

	};


	 factory.getSession = function(userName, password){
		console.log(userName, password + "in fac"); 
		Parse.User.logIn(userName, password, {	
			success: function(user){
				
			}, 
			error: function(user, error){
				console.log("error"); 
			}
		}); 

		

	};

	return factory;
}); 