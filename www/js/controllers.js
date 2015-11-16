angular.module('kontribute.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $firebaseAuth, $state, $http, $ionicPopup, $location, $window,eventFactory, eventService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

   var vm = this;
   vm.result;
   

  // Form data for the login modal
  $scope.loginData = {};
  $scope.eventSubmitted = false; 
  $scope.eventCreation = false; 
  $scope.anotherOne = false; 
  $scope.attendingEvent = true; 
  
  //for validation
  $scope.inputBoxesFilled = true; 
  $scope.titleInput = true; 
  $scope.timeInput = true;
  $scope.dateInput = true; 
  $scope.addressInput = true; 
  $scope.descriptionInput = true; 
  $scope.guestsInput = true; 
  
  $scope.votingPoll = 'pollFalse';
  $scope.kontributeList = 'kontributeFalse';



 $scope.getUserDetails = 
   function () {
   $scope.eventSubmitted = true; 
     return eventFactory.getAllEvents().then(function(data) { //2. so you can use .then()
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
   
if(title == undefined) {
$scope.titleInput = false;
} else {
$scope.titleInput = true;
}
if(date == undefined) {
$scope.dateInput = false;  
} else {
$scope.dateInput = true;
}
if(time == undefined) {
$scope.timeInput = false; 
} else {
$scope.timeInput = true;
}
if(address == undefined){
$scope.addressInput = false; 
} else {
$scope.addressInput = true; 
}
if(description == undefined){
$scope.descriptionInput = false; 
} else {
$scope.descriptionInput = true; 
}
if(guests == undefined){
$scope.guestsInput = false; 
} else {
$scope.guestsInput = true; 
}
     

    if(!$scope.titleInput || !$scope.dateInput || !$scope.timeInput 
      || !$scope.addressInput || !$scope.descriptionInput || !$scope.descriptionInput || !$scope.guestsInput) {
       $scope.inputBoxesFilled = false; 
    } else {

    eventService.createEvent(title, date, time, address, description, guests);
    $scope.confirmEvent(); 
  }
    
  }; 
 

$scope.validation = function(){
  $scope.eventCreation = false; 
}; 

  // Open the login modal
$scope.login = function() {
    console.log("running?");
    $state.go('app.login');
    console.log("yes");
  };

})

// Handles login and registration
.controller('AuthCtrl', function($scope, authFactory, $firebaseAuth, $state, $window, $location ) {

  var firebaseRef = new Firebase('https://torrid-torch-6578.firebaseio.com');
  var auth = $firebaseAuth(firebaseRef);

  var authCtrl = this;

  authCtrl.user = {
    email: '',
    password: ''
  };

    // Perform the login action when the user submits the login form
  authCtrl.doLogin = function() {
    authFactory.$authWithPassword(authCtrl.user).then(function(auth){
      $state.go('app.home');
    }, function(error){
      authCtrl.error = error;
    });

  };

  $scope.goToRegister = function() {
    $state.go('app.register');
  }

  authCtrl.signUp = function() {
    authFactory.$createUser(authCtrl.user).then(function(user){
      $state.go('app.home');
      $window.location.reload();
    }, function(error) {
      authCtrl.error = error;
    });
  };


})

// Handles user profile
.controller('ProfileCtrl', function($state, authFactory, $window, usersFactory) {
  var profileCtrl = this;



  profileCtrl.doLogout = function(){
    authFactory.$unauth();
    console.log("logout?")
    $state.go('app.home');
    $window.location.reload();
  };

})


.controller('MapController', function($scope, $ionicLoading) {
 
    $scope.initialise = function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("map"), mapOptions);
 
        navigator.geolocation.getCurrentPosition(function(pos) {
            map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
            var myLocation = new google.maps.Marker({
                position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                map: map,
                title: "My Location"
            });
        });
 
        $scope.map = map;
    };
    google.maps.event.addDomListener(document.getElementById("map"), 'load', $scope.initialise())

 
});


 