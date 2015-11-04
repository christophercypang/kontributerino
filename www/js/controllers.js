angular.module('kontribute.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $firebaseAuth, $state, $http, $ionicPopup, eventFactory, eventService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

   var vm = this;
   vm.result;
   

  var firebaseRef = new Firebase('https://torrid-torch-6578.firebaseio.com');
  var loginObj = $firebaseAuth(firebaseRef);

  // Form data for the login modal
  $scope.loginData = {};
  $scope.eventSubmitted = false; 
  $scope.eventCreation = false; 
  $scope.anotherOne = false; 
  $scope.attendingEvent = true; 
  




 $scope.getUserDetails = 
   function () {
   $scope.eventSubmitted = true; 
     return eventFactory.getAllUsers().then(function(data) { //2. so you can use .then()
              console.log("we out here" + data.Title); 
              $scope.name = data.data.event.Title;
              $scope.date = data.data.event.Date;  
              $scope.time = data.data.event.Time; 
              $scope.address = data.data.event.Address; 
              $scope.description = data.data.event.Description; 
              $scope.users = data.data.event.Users; 
              console.log(data.data.event.Title); 

    
             });
        

       };
   
$scope.showEvent = function(){
  $scope.eventCreation = false; 
  $scope.anotherOne = false; 
  breakButton(); 
}

$scope.breakButton = function(){
  $scope.anotherOne = false; 
}


  $scope.confirmEvent = 
  function (){
       
      var alert = $ionicPopup.alert({
        title: 'Event Created!', 
        template: 'Thanks for Kontributing!'
      });
      alert.then(function(res){
        $scope.eventCreation = true; 
         $scope.anotherOne = true; 
      }); 

  } 
$scope.createEvent = 
  function(title, date, time, address, description, guests){
    console.log("here in CTRL", title, date, time, address, description, guests); 
   
    eventService.createEvent(title, date, time, address, description, guests);
    $scope.confirmEvent(); 
    
  }; 
 

$scope.validation = 
function(){
  $scope.eventCreation = false; 
}; 
  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function(e) {
    e.preventDefault();
    var username = $scope.loginData.username;
    var password = $scope.loginData.password;

    loginObj.$authWithPassword ({
      email: username,
      password: password
    })
    .then(function(user) {
      console.log('Authentication success.');
      $scope.closeLogin();
    }).catch(function(error) {
    })
      alert(error);
  };

  $scope.goToRegister = function() {
    console.log("This is being called.");
    $state.transitionTo('app.register');
  }

})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('RegisterCtrl', function($scope, $firebaseAuth, $location) {
    var firebaseObj = new Firebase('https://torrid-torch-6578.firebaseio.com');
    var auth = $firebaseAuth(firebaseObj);

    $scope.user ={};

    $scope.signUp = function() {
        var email = $scope.user.email;
        var password = $scope.user.password;
        if (email && password) {
            auth.$createUser(email, password)
            .then(function() {
              console.log("User creation success.");
              // send user to login page
              $location.path('app');
            }).catch(function(error) {
              alert(error);
            });
      }
    
  };

})

