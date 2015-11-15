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
   

  var firebaseRef = new Firebase('https://torrid-torch-6578.firebaseio.com');
  var loginObj = $firebaseAuth(firebaseRef);
  
  var userLogged = firebaseRef.getAuth();

  //stores current user
  var currentUser = {};

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

    if (userLogged !== null) {
      console.log("user " + userLogged.uid + " is logged in with " + userLogged.provider);
      $state.go('app.profile');
      $scope.username = userLogged.uid;
    }else{
      console.log("user is logged out.");
    $scope.modal.show();
  }
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    var username = $scope.loginData.username;
    var password = $scope.loginData.password;


    loginObj.$authWithPassword ({
      email: username,
      password: password
    })
    .then(function(user) {
      console.log('Authentication success.');
      $scope.closeLogin();
      $location.path('app');
      $window.location.reload();
    }).catch(function(error) {
      alert(error);
    })
  };

  $scope.doLogout = function() {
    console.log("do logout");
    firebaseRef.unauth();
    userLogged == null;
    $location.path('app');
    $window.location.reload();
  }

  $scope.goToRegister = function() {
    console.log("This is being called.");
    $scope.closeLogin();
    $state.go('app.register');
  }

  // profile shit
  
})




.controller('RegisterCtrl', function($scope, $firebaseAuth, $location) {
    var firebaseObj = new Firebase('https://torrid-torch-6578.firebaseio.com');
    var auth = $firebaseAuth(firebaseObj);

    $scope.user ={};

    $scope.signUp = function() {
        var email = $scope.user.email;
        var password = $scope.user.password;
        if (email && password) {
            auth.$createUser( {
              email: email,
              password: password} )
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


 