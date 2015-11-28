angular.module('kontribute.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout, $state, $http, $ionicPopup, $location, $window, $cordovaContacts, usersFactory, eventFactory, eventService) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});


  // var ref = new Firebase('https://torrid-torch-6578.firebaseio.com');
  // var authData = ref.getAuth();

  try { 
  var profileInfo = usersFactory.getUser(authData.uid)
  $scope.userName = authData.uid; 
  } catch (e) {
    console.log("not logged in, go log in homie"); 
  }
 Parse.initialize('FMq0Oa8GDND7cVrvVSllAAZiYjlpb3DHvaTk5WFX','Dvpbv2XOFsVmFxtIs4BY3N7FbKM6EAj2JwC5RvQ9'); 



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
  $scope.streetInput = true; 
  $scope.cityInput = true; 
  $scope.provinceInput = true; 
  $scope.descriptionInput = true; 
  $scope.guestsInput = true; 
  
  $scope.locationSelected = false; 

  $scope.kcount = 1;
  $scope.kcurr = 1;
  $scope.updateklistnum = 0;
  $scope.updateklistnumi = 0;
  $scope.notViewList = false;
  $scope.knameInput = true; 
  $scope.kquantityInput = true; 
  
  $scope.events = [];  
  $scope.votingPoll = 'pollFalse';
  $scope.kontributeList = 'kontributeFalse';

  $scope.guestButtonClicked = false; 
  $scope.otherPeople = false; 
$scope.gList = false; 
$scope.describeClicked = false; 

$scope.getAllContacts = function(){
  $cordovaContacts.find({filter: ''}).then(function(results) {
    $scope.contacts = results; 
    console.log($scope.contacts); 
  }, function(error) {
    console.log(error); 
  }); 
}

$scope.getAllEventsHosting = 
  function() {
    return eventFactory.getAllHostedEvents($scope.userName).then(function(data){
          var array = []; 
          var temp =[];  
          $scope.events = []; 
          array = Object.keys(data.data.host);        
          for(var i=0; i < array.length; i++){
              $scope.events[i] = data.data.host[array[i]];  
              }
            
          // array.forEach(function(element) {
          //   $scope.events
          // })
        $scope.setScope($scope.events); 
      
    });
  };

 $scope.getUserDetails = 
   function () {
   $scope.eventSubmitted = true; 
     return eventFactory.getAllEvents().then(function(data) { 
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

$scope.getKontributeLists = 
  function() {
    return eventFactory.getKontributeLists($scope.userName).then(function(data){
          var array = []; 
          var temp =[];  
          $scope.events = []; 
          array = Object.keys(data.data.kontributelists);        
          for(var i=0; i < array.length; i++){
              $scope.events[i] = data.data.kontributelists[array[i]];  
              }
        $scope.setScope($scope.events); 

      });
  };

$scope.getKontributeListsi = 
  function() {
    return eventFactory.getKontributeListsi($scope.userName).then(function(data){
          var array = []; 
          var temp =[];  
          $scope.eventsi = []; 
          array = Object.keys(data.data.kontributelists);        
          for(var i=0; i < array.length; i++){
              $scope.eventsi[i] = data.data.kontributelists[array[i]];  
              }
        $scope.setScope($scope.eventsi); 

      });
  };

$scope.locationClick = function(){
  if($scope.locationSelected == false){
    $scope.locationSelected = true; 
  } else {
    $scope.locationSelected = false; 
  }
 
}

$ionicModal.fromTemplateUrl('templates/invfriends.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
  });


// var ref = new Firebase('https://torrid-torch-6578.firebaseio.com/');
// var authData = ref.getAuth();
// // check if you are logged in
// if (authData != null) {
// var friendsRef = new Firebase('https://torrid-torch-6578.firebaseio.com/users/'+authData.uid+'/friends') ;
// var invitedRef = new Firebase('https://torrid-torch-6578.firebaseio.com/TEMPINV/'+authData.uid+'/invited'); 




$scope.showGuests = function() {
 
  if($scope.guestButtonClicked == false){
    $scope.guestButtonClicked = true; 
  } else {
    $scope.guestButtonClicked = false; 
  }
 
}



$scope.showDescribe = function() {
 
  if($scope.describeClicked == false){
    $scope.describeClicked = true; 
  } else {
    $scope.describeClicked = false; 
  }
 
}


$scope.friendPage = function(){
  if($scope.otherPeople == true){
    $scope.otherPeople = false; 
  }
  $state.go('app.donotdelete'); 
}

$scope.otherPeoplePage = function(){

    $scope.otherPeople = true; 
     $state.go('app.donotdelete'); 

}



$scope.guestList = function(){
    $scope.guestListClicked = true; 
     $state.go('app.guestList'); 

}






$scope.closeGuests= function() {
  $scope.modal.hide();
}

// $scope.getGuests=function() {
//   friendsRef.on('value', function(snapshot) {
//     $scope.allFriends = snapshot.val();

//   })
// }

$scope.inviteFriend = function(friend) {
  var friendUid = friend.friend.uid;
  eventFactory.createInviteList(authData.uid, friend, friendUid);
  console.log("invite " + friend.friend.uid);

}

$scope.getInvitedGuests= function() {
  
    return eventFactory.getAllInvitedGusts($scope.userName).then(function(data){
         
          var array = []; 
          var temp =[];  
          $scope.guests = []; 
          array = Object.keys(data.data.invited);    
      
          for(var i=0; i < array.length; i++){
              $scope.guests[i] = data.data.invited[array[i]];  
              }
            
          // array.forEach(function(element) {
          //   $scope.events
          // })
          if($scope.guests.length > 0){
            $scope.gList = true; 
          } else {
            $scope.gList = false; 
          }
       
      
    });
  };

$scope.unInvite = function(index) {
console.log($scope.guests[index]); 
var removeGUid = $scope.guests[index].friend.friend.uid;
$scope.guests.splice(index, 1); 
  // console.log("guid of person i want to delete:" +removeGUid);
 eventFactory.unInvite(authData.uid, removeGUid);

}





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

  $scope.checkVote = function(votingPoll) {
  console.log("CheckVote");
  if(votingPoll == 'pollTrue') {
    $state.go('app.vote');
  } else {
    $state.go('app.kontribution');
  };
}


$scope.createEvent = 
  function(title, date, time, street, city, province, description, guests){
    console.log("here in CTRL", title, date, time, street, city, province, description, guests); 
   
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
if(street == undefined){
$scope.streetInput = false; 
} else {
$scope.streetInput = true; 
}
if(city == undefined){
$scope.cityInput = false; 
} else {
$scope.cityInput = true; 
}
if(province == undefined){
$scope.provinceInput = false; 
} else {
$scope.provinceInput = true; 
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
      || !$scope.streetInput || !$scope.cityInput || !$scope.provinceInput || !$scope.descriptionInput || !$scope.descriptionInput || !$scope.guestsInput) {
       $scope.inputBoxesFilled = false; 
    } else {

    eventService.createEvent(title, date, time, street, city, province, description, guests, $scope.userName);
    $scope.confirmEvent(); 
  }
    
  }; 
 
 
 
 
$scope.createLocalEvent = function(title, date, time, street, city, province, description, guests) {
  eventService.createLocalEvent(title, date, time, street, city, province, description, guests, $scope.userName);
}

$scope.createKontributeList = function(listname, listquantity, kcount) {
  eventService.createKontributeList(listname, listquantity, kcount, $scope.userName);
  
  if(listname == undefined){
  $scope.knameInput = false; 
  } else {
  $scope.knameInput = true; 
  }

  if(listquantity == undefined){
  $scope.kquantityInput = false; 
  } else {
  $scope.kquantityInput = true; 
  }
     
    if(!$scope.knameInput || !$scope.kquantityInput) {
       $scope.inputBoxesFilled = false; 
    } else {
    eventService.createKontributeList(listname, listquantity, kcount, $scope.userName);
    }
}

$scope.updatelist = function(changeq, updateklistnum) {
  eventService.updatelist(changeq, updateklistnum, $scope.userName);
  $window.location.reload();
}

$scope.updatelisti = function(changeq, updateklistnum) {
  eventService.updatelisti(changeq, updateklistnum, $scope.userName);
  $window.location.reload();
}

$scope.inviteUserToEvent = function(title, date, time, street, city, province, description, guests) {
  eventService.inviteUserToEvent(title, date, time, street, city, province, description, guests);
}



$scope.validation = function(){
  $scope.eventCreation = false; 
}; 

$scope.returnHome = function() {
  $state.go('app.home');
  $window.location.reload();
};

  // Open the login modal
$scope.login = function() {
console.log("here"); 
var curr = Parse.User.current(); 
console.log(curr); 



if(curr != null){
 $state.go('app.profile'); 
               } else {
             $state.go('app.login');   
          }
    
   
  }; 


})





// Handles login and registration
.controller('AuthCtrl', function($scope, authFactory, $state, $window, $location, usersFactory, $rootScope, $ionicHistory ) {
  $scope.loginClicked = false;
  $scope.registerButtonClicked = false;
  $scope.hideLogin = false; 
  $scope.hideRegister = false; 



  $scope.loginButtonClicked = function (){
      if($scope.loginClicked == true){
        $scope.loginClicked = false; 
        $scope.hideRegister = false; 
      } else {
        $scope.loginClicked = true; 
        $scope.hideRegister = true; 
        
      }
  }
$scope.registerButton= function (){
      if($scope.registerButtonClicked == true){
        $scope.registerButtonClicked = false; 
        $scope.hideLogin = false;  
      } else {
        $scope.registerButtonClicked = true;
        $scope.hideLogin = true;  

      }
  }



 var user = new Parse.User(); 

  var authCtrl = this; 
  var userModel;

  authCtrl.user = {
    email: '',
    password: '',
    username: '', 
  };

  authCtrl.register = {
    firstname: '',
    lastname: '',
  };


    // Perform the login action when the user submits the login form
  authCtrl.doLogin = function(username, password) {

    console.log(username, password); 

    authFactory.loginUser(username, password); 
      
     $state.go('app.home');
      
     // $window.location.reload();
   

  };

  $scope.goToRegister = function() {
    $state.go('app.register');
  }


  $scope.FBLogin = function() {
    console.log("hello");
    firebaseRef.authWithOAuthPopup('facebook', function(error, authData){
      console.log(authData.uid);
      $state.go('app.home');
    } )

    // authFactory.$onAuth(function(authData) {
    //   if(authData === null) {
    //     console.log('not logged in');
    //   }
    // } else {
    //   $state.go('app.home');
    //   console.log('logged in as ' + authData.uid);
    // });
  }


  authCtrl.signUp = function(email, password, firstname, lastname) {
   

   authFactory.registerUser(authCtrl.user.username, authCtrl.user.password, authCtrl.user.email, authCtrl.register.firstname, authCtrl.register.lastname).then(function(user){
     

     $ionicHistory.nextViewOptions({
    disableBack: true
      });

      $state.go('app.home');
    
    //  usersFactory.createUser(user.uid, authCtrl.user.email, authCtrl.user.password, 
    //    authCtrl.register.firstname, authCtrl.register.lastname);
      $window.location.reload();
    }, function(error) {
      alert(error);
    });
  };


})

// Handles user profile
.controller('ProfileCtrl', function($ionicModal, $ionicHistory, $state, authFactory, $window, usersFactory, $http, $scope, $rootScope) {
  var profileCtrl = this;
Parse.initialize('FMq0Oa8GDND7cVrvVSllAAZiYjlpb3DHvaTk5WFX','Dvpbv2XOFsVmFxtIs4BY3N7FbKM6EAj2JwC5RvQ9'); 
 
$scope.emailclicked = false; 
$scope.usernameclicked = false; 


   $scope.getProfileInfo = function() {
    var user = Parse.User.current(); 
    
    $scope.firstname = user.get("firstName"); 
    $scope.lastname = user.get("lastName");
    $scope.memberSince = user.get("createdAt"); 
    $scope.username = user.get("username"); 
    $scope.email = user.get("email"); 

  };


$scope.changeUserName = function(username){
  var user = Parse.User.current(); 
  $scope.username = username; 
  var temp = username; 

    user.save(null, {
    success: function(user) {
       user.set("username", temp); 
      user.save();
    }
  });
}


$scope.changeEmail = function(email){
  var user = Parse.User.current(); 
  $scope.email = email; 
  var temp = email; 

    user.save(null, {
    success: function(user) {
       user.set("email", temp); 
      user.save();
    }
  });
}


$scope.toggleusername = function(){
  if($scope.usernameclicked == false){

$scope.usernameclicked = true; 
} else {
$scope.usernameclicked = false; 
}
}

$scope.toggleemail = function(){
 
  if($scope.emailclicked == false){
$scope.emailclicked = true; 
} else {
$scope.emailclicked = false; 
}
}

  $scope.getAllUsers = function() {
    usersRef.on('value', function(snapshot){
      $scope.allUsers = snapshot.val();
      console.log($scope.allUsers);
    })

  }

  $scope.getFriends = function(){
    friendsRef.on('value', function(snapshot){
      $scope.allFriends = snapshot.val();

      console.log($scope.allFriends);
    })
  };

  $scope.addFriend = function(user) {
    var friendUid = user.uid;
    usersFactory.addFriend(authData.uid, user, friendUid);
  };

  $scope.removeFriend = function(friend) {
    var removeUid = friend.friend.uid;
    usersFactory.removeFriend(authData.uid, removeUid);
    
  }



  $ionicModal.fromTemplateUrl('templates/friends.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal){
    $scope.modal = modal;
  });

  $scope.closeFriends = function() {
    $scope.modal.hide();
  };

  $scope.showFriends = function() {
    $scope.modal.show();

  };






  profileCtrl.doLogout = function(){
    
   Parse.User.logOut(); 
     $ionicHistory.nextViewOptions({
    disableBack: true
      });
    $state.go('app.home');
    
  };

})


.controller('MapController', function($scope, $ionicLoading, eventFactory, eventService) {
 
Parse.initialize('FMq0Oa8GDND7cVrvVSllAAZiYjlpb3DHvaTk5WFX','Dvpbv2XOFsVmFxtIs4BY3N7FbKM6EAj2JwC5RvQ9'); 

  // var ref = new Firebase('https://torrid-torch-6578.firebaseio.com');
  // var authData = ref.getAuth();

  try { 
  var profileInfo = usersFactory.getUser(authData.uid)
  $scope.userName = authData.uid; 
  console.log("dude is back" + $scope.userName); 
  } catch (e) {
    console.log("not logged in, go log in homie"); 
  }


$scope.allEventsShowing = false; 
$scope.showAll;
$scope.showAllHosting;  
$scope.notInvited = false;
$scope.notHosting = false;

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
    

    $scope.getEventsForMap = function(){
         var data = eventFactory.getEventsForMap($scope.userName);  
           $scope.events = []; 
       var user = Parse.User.current(); 
              data.equalTo("user", user); 
              data.find({
                success: function(results){
                  for(i in results){
                    $scope.kEvent = []; 
                    $scope.kEvent[i] = results[i];  
              
               $scope.events[i] = { 
                Title:  $scope.kEvent[i].get("Title"), 
                eventDate: $scope.kEvent[i].get("Date"), 
                Time: $scope.kEvent[i].get("Time"), 
                Address: $scope.kEvent[i].get("Address"), 
                Description: $scope.kEvent[i].get("Description"), 
                
            }; 
            

console.log($scope.events[i]);

                  }
                }
              })

        

    };

  

  $scope.plotOnMap = function(name){
            var geocoder;
            var map;
            var address = name; 
            
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(-34.397, 150.644);
     

            var myOptions = {
              zoom: 8,
              center: latlng,
              mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("map"), myOptions);

        geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
                }

            })

 
};

$scope.plotAllOnMap = function(showAll){
  if (showAll == false){ 
       $scope.initialise();  
        } else { 
    return eventFactory.getEventsForMap($scope.userName).then(function(data) { 
              var array = [];               
              array = Object.keys(data.data.invited);
              $scope.events = []; 
              $scope.locations = []; 
             
              for(var i=0; i < array.length; i++){
              $scope.events[i] = data.data.invited[array[i]]; 
               }

              for(var j=0; j< $scope.events.length; j++){
                $scope.locations[j] = $scope.events[j].event.Address; 
              }


            var geocoder;
            var map;
            
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(-34.397, 150.644);
     

            var myOptions = {
              zoom: 8,
              center: latlng,
              mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    


    map = new google.maps.Map(document.getElementById("map"), myOptions);
  
    for(var z = 0; z < $scope.locations.length; z++){
       var address = $scope.locations[z]; 
        geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
                }

            })
        }



});


}
};
})

 
.controller('VoteController',function($scope,$ionicPopup, $state, $window){
        console.log("vote controller");

        $scope.items=[];
        $scope.showPopup = function() {
            $scope.data = {}

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="data.vote">',
                title: 'Enter New Option',
                subTitle: 'Add New Option',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Add</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.data.vote) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                            } else {
                                return $scope.data;
                            }
                        }
                    },
                ]
            });
            myPopup.then(function(res) {
        
                if(typeof res!='undefined')
                  res.close="ion-close";
                $scope.items.push(res)

            });
           /* $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);*/
          $scope.removeTestCase=function(){
          $scope.remove();
           };
          };

         $scope.addVoteOption=function(){
            $scope.showPopup();
        };

        $scope.remove = function(item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
      };

      $scope.returnEvent = function() {
        $scope.confirmEvent();
        // $state.go('app.events');
      };

      $scope.toKontributeList = function() {
        $state.go('app.kontribution');
      };

})

.controller('KontributeController',function($scope,$ionicPopup, $state, $window){
        console.log("kontribute controller");

        $scope.items=[];
        $scope.showPopup = function() {
            $scope.data = {}

            // An elaborate, custom popup
            var myPopup = $ionicPopup.show({
                template: '<input type="text" ng-model="data.kontribute">',
                title: 'Enter New Option',
                subTitle: 'Add New Option',
                scope: $scope,
                buttons: [
                    { text: 'Cancel' },
                    {
                        text: '<b>Add</b>',
                        type: 'button-positive',
                        onTap: function(e) {
                            if (!$scope.data.kontribute) {
                                //don't allow the user to close unless he enters wifi password
                                e.preventDefault();
                                console.log("FAGGOT");
                            } else {
                              console.log("TESTERINO");
                                return $scope.data;
                              console.log("Test 2");
                            }
                        }
                   },
                ]
            });
            myPopup.then(function(res) {
                console.log('Tapped!', res);
                if(typeof res!='undefined')
                  res.close="ion-close";
                $scope.items.push(res)

                console.log($scope.items);
                console.log('Testing123');
            });
           /* $timeout(function() {
                myPopup.close(); //close the popup after 3 seconds for some reason
            }, 3000);*/
          $scope.removeTestCase=function(){
          $scope.remove();
           };
          };

         $scope.addKontributeOption=function(){
            $scope.showPopup();
        };

        $scope.remove = function(item) {
        $scope.items.splice($scope.items.indexOf(item), 1);
      };

      $scope.returnEvent = function() {
        $scope.confirmEvent();
        $state.go('app.events');
      };
})

.controller('HostMapController', function($scope, $ionicLoading, $state, eventFactory, eventService) {
 
Parse.initialize('FMq0Oa8GDND7cVrvVSllAAZiYjlpb3DHvaTk5WFX','Dvpbv2XOFsVmFxtIs4BY3N7FbKM6EAj2JwC5RvQ9'); 



$scope.gotoEditPage = function(){
  $state.go('app.editEvent'); 
}

  // var ref = new Firebase('https://torrid-torch-6578.firebaseio.com');
  // var authData = ref.getAuth();

  try { 
  var profileInfo = usersFactory.getUser(authData.uid)
  $scope.userName = authData.uid; 
  console.log("dude is back" + $scope.userName); 
  } catch (e) {
    console.log("not logged in, go log in homie"); 
  }


$scope.allEventsShowing = false; 
$scope.showAll;
$scope.showAllHosting;  
$scope.notInvited = false;
$scope.notHosting = false;

    $scope.initialise = function() {
        var myLatlng = new google.maps.LatLng(37.3000, -120.4833);
 
        var mapOptions = {
            center: myLatlng,
            zoom: 16,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        };
 
        var map = new google.maps.Map(document.getElementById("hostMap"), mapOptions);
 
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

google.maps.event.addDomListener(document.getElementById("hostMap"), 'load', $scope.initialise())
    

    $scope.getEventsForMap = function(){
         var data = eventFactory.getEventsForMap($scope.userName);  
           $scope.events = []; 
       var user = Parse.User.current(); 
              data.equalTo("user", user); 
              data.find({
                success: function(results){
                  for(i in results){
                    $scope.kEvent = []; 
                    $scope.kEvent[i] = results[i];  
              
               $scope.events[i] = { 
                Title:  $scope.kEvent[i].get("Title"), 
                eventDate: $scope.kEvent[i].get("Date"), 
                Time: $scope.kEvent[i].get("Time"), 
                Address: $scope.kEvent[i].get("Address"), 
                Description: $scope.kEvent[i].get("Description"), 
                
            }; 
            

console.log($scope.events[i]);

                  }
                }
              })

        

    };
  $scope.plotOnMap = function(name){
            var geocoder;
            var map;
            var address = name; 
            
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(-34.397, 150.644);
     

            var myOptions = {
              zoom: 8,
              center: latlng,
              mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    map = new google.maps.Map(document.getElementById("hostMap"), myOptions);

        geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
                }

            })

 
};

$scope.plotAllOnMap = function(showAll){
  if (showAll == false){ 
       $scope.initialise();  
        } else { 
    return eventFactory.getEventsForMap($scope.userName).then(function(data) { 
              var array = [];               
              array = Object.keys(data.data.host);
              $scope.events = []; 
              $scope.locations = []; 
             
              for(var i=0; i < array.length; i++){
              $scope.events[i] = data.data.host[array[i]]; 
               }

              for(var j=0; j< $scope.events.length; j++){
                $scope.locations[j] = $scope.events[j].event.Address; 
              }


            var geocoder;
            var map;
            
            geocoder = new google.maps.Geocoder();
            var latlng = new google.maps.LatLng(-34.397, 150.644);
     

            var myOptions = {
              zoom: 8,
              center: latlng,
              mapTypeId: google.maps.MapTypeId.ROADMAP
    }
    


    map = new google.maps.Map(document.getElementById("hostMap"), myOptions);
  
    for(var z = 0; z < $scope.locations.length; z++){
       var address = $scope.locations[z]; 
        geocoder.geocode( { 'address': address}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
        map.setCenter(results[0].geometry.location);
        var marker = new google.maps.Marker({
            map: map,
            position: results[0].geometry.location
        });
                }

            })
        }



});


}
};
})



.controller('CalendarCtrl', function ($scope, $cordovaCalendar) {


   $scope.createEvent = function() {
        $cordovaCalendar.createEvent({
            title: 'Space Race',
            location: 'The Moon',
            notes: 'Bring sandwiches',
            startDate: new Date(2015, 0, 15, 18, 30, 0, 0, 0),
            endDate: new Date(2015, 1, 17, 12, 0, 0, 0, 0)
        }).then(function (result) {
            console.log("Event created successfully");
        }, function (err) {
            console.error("There was an error: " + err);
        });
    }
 
})



//   $cordovaCalendar.createCalendar({
//     calendarName: 'Cordova Calendar',
//     calendarColor: '#FF0000'
//   }).then(function (result) {
//     // success
//   }, function (err) {
//     // error
//   });

//   $cordovaCalendar.deleteCalendar('Cordova Calendar').then(function (result) {
//     // success
//   }, function (err) {
//     // error
//   });

//   $cordovaCalendar.createEvent({
//     title: 'Space Race',
//     location: 'The Moon',
//     notes: 'Bring sandwiches',
//     startDate: new Date(2015, 0, 6, 18, 30, 0, 0, 0),
//     endDate: new Date(2015, 1, 6, 12, 0, 0, 0, 0)
//   }).then(function (result) {
//     // success
//   }, function (err) {
//     // error
//   });

//   $cordovaCalendar.createEventWithOptions({
//     title: 'Space Race',
//     location: 'The Moon',
//     notes: 'Bring sandwiches',
//     startDate: new Date(2015, 0, 6, 18, 30, 0, 0, 0),
//     endDate: new Date(2015, 1, 6, 12, 0, 0, 0, 0)
//   }).then(function (result) {
//     // success
//   }, function (err) {
//     // error
//   });

//   $cordovaCalendar.createEventInteractively({
//     title: 'Space Race',
//     location: 'The Moon',
//     notes: 'Bring sandwiches',
//     startDate: new Date(2015, 0, 6, 18, 30, 0, 0, 0),
//     endDate: new Date(2015, 1, 6, 12, 0, 0, 0, 0)
//   }).then(function (result) {
//     // success
//   }, function (err) {
//     // error
//   });

//   $cordovaCalendar.createEventInNamedCalendar({
//     title: 'Space Race',
//     location: 'The Moon',
//     notes: 'Bring sandwiches',
//     startDate: new Date(2015, 0, 6, 18, 30, 0, 0, 0),
//     endDate: new Date(2015, 1, 6, 12, 0, 0, 0, 0),
//     calendarName: 'Cordova Calendar'
//   }).then(function (result) {
//     // success
//   }, function (err) {
//     // error
//   });

//   $cordovaCalendar.findEvent({
//     title: 'Space Race',
//     location: 'The Moon',
//     notes: 'Bring sandwiches',
//     startDate: new Date(2015, 0, 6, 18, 30, 0, 0, 0),
//     endDate: new Date(2015, 1, 6, 12, 0, 0, 0, 0)
//   }).then(function (result) {
//     // success
//   }, function (err) {
//     // error
//   });

//   $cordovaCalendar.listEventsInRange(
//     new Date(2015, 0, 6, 0, 0, 0, 0, 0),
//     new Date(2015, 1, 6, 0, 0, 0, 0, 0)
//   ).then(function (result) {
//     // success
//   }, function (err) {
//     // error
//   });

//   $cordovaCalendar.listCalendars().then(function (result) {
//     // success
//   }, function (err) {
//     // error
//   });

//   $cordovaCalendar.findAllEventsInNamedCalendar('Cordova Calendar').then(function (result) {
//     // success
//   }, function (err) {
//     // error
//   });

//   $cordovaCalendar.modifyEvent({
//     title: 'Space Race',
//     location: 'The Moon',
//     notes: 'Bring sandwiches',
//     startDate: new Date(2015, 0, 6, 18, 30, 0, 0, 0),
//     endDate: new Date(2015, 1, 6, 12, 0, 0, 0, 0), 
//     newTitle: 'Ostrich Race',
//     newLocation: 'Africa',
//     newNotes: 'Bring a saddle',
//     newStartDate: new Date(2015, 2, 12, 19, 0, 0, 0, 0),
//     newEndDate: new Date(2015, 2, 12, 22, 30, 0, 0, 0)
//   }).then(function (result) {
//     // success
//   }, function (err) {
//     // error
//   });

//   $cordovaCalendar.deleteEvent({
//     newTitle: 'Ostrich Race',
//     location: 'Africa',
//     notes: 'Bring a saddle',
//     startDate: new Date(2015, 2, 12, 19, 0, 0, 0, 0),
//     endDate: new Date(2015, 2, 12, 22, 30, 0, 0, 0)
//   }).then(function (result) {
//     // success
//   }, function (err) {
//     // error
//   });

// }) 

.controller('editEventCtrl', function($scope, $ionicLoading, $state, eventFactory, eventService, usersFactory) {


Parse.initialize('FMq0Oa8GDND7cVrvVSllAAZiYjlpb3DHvaTk5WFX','Dvpbv2XOFsVmFxtIs4BY3N7FbKM6EAj2JwC5RvQ9'); 



$scope.descriptionclicked = false; 
$scope.timeclicked = false;
$scope.titleclicked = false;
$scope.dateclicked = false;
$scope.addressclicked = false;


$scope.selectedVal = false; 



  // var ref = new Firebase('https://torrid-torch-6578.firebaseio.com');
  // var authData = ref.getAuth();

  try { 
  var profileInfo = usersFactory.getUser(authData.uid)
  $scope.userName = authData.uid; 
  console.log("dude is back" + $scope.userName); 
  } catch (e) {
    console.log("not logged in, go log in homie"); 
  }

  



$scope.toggletime = function(){
  if($scope.timeclicked == false){

$scope.timeclicked = true; 
} else {
$scope.timeclicked = false; 
}
}

$scope.toggletitle= function(){
 
  if($scope.titleclicked == false){
$scope.titleclicked = true; 
} else {
$scope.titleclicked = false; 
}
}

$scope.toggledate = function(){
   if($scope.dateclicked == false){
$scope.dateclicked = true; 
} else {
$scope.dateclicked = false; 
}
}

$scope.toggledescription = function(){
  if($scope.descriptionclicked == false){
$scope.descriptionclicked = true; 
} else {
$scope.descriptionclicked = false; 
}
}

$scope.toggleaddress = function(){
if($scope.addressclicked == false){
$scope.addressclicked = true; 
} else {
$scope.addressclicked = false; 
}
}




$scope.updateTitle = function(changes){
  var KontributeEvents = Parse.Object.extend("KontributeEvent")
  var kontributeEvents = new KontributeEvents();
  var user = Parse.User.current();
  kontributeEvents.set("objectId", $scope.events[0].objectID);
  kontributeEvents.set("Address", $scope.events[0].Address);
  kontributeEvents.set("Title", $scope.events[0].Title);
  kontributeEvents.set("Time",$scope.events[0].Time);
  kontributeEvents.set("Date", $scope.events[0].eventDate);
  kontributeEvents.set("Description", $scope.events[0].Description);

  var temp = 'title'; 
  var oldTitle = $scope.events[0].Title;
  $scope.events[0].Title = changes; 
  kontributeEvents.save(null, {
    success: function(kontributeEvents) {
      kontributeEvents.set("Title", changes);
      kontributeEvents.save();
    }
  });
}






$scope.updateTime = function(changes){
  var KontributeEvents = Parse.Object.extend("KontributeEvent")
  var kontributeEvents = new KontributeEvents();
  var user = Parse.User.current();
  kontributeEvents.set("objectId", $scope.events[0].objectID);
  kontributeEvents.set("Address", $scope.events[0].Address);
  kontributeEvents.set("Title", $scope.events[0].Title);
  kontributeEvents.set("Time",$scope.events[0].Time);
  kontributeEvents.set("Date", $scope.events[0].eventDate);
  kontributeEvents.set("Description", $scope.events[0].Description);

  var temp = 'time'; 
  var oldTitle = $scope.events[0].Time;
  $scope.events[0].Time = changes; 
  kontributeEvents.save(null, {
    success: function(kontributeEvents) {
      kontributeEvents.set("Time", changes);
      kontributeEvents.save();
    }
  });
}


$scope.updateAddress = function(street, city, province){
  var temp = street + ", " + city + ", " + province;
  var KontributeEvents = Parse.Object.extend("KontributeEvent")
  var kontributeEvents = new KontributeEvents();
  var user = Parse.User.current();
  kontributeEvents.set("objectId", $scope.events[0].objectID);
  kontributeEvents.set("Address", $scope.events[0].Address);
  kontributeEvents.set("Title", $scope.events[0].Title);
  kontributeEvents.set("Time",$scope.events[0].Time);
  kontributeEvents.set("Date", $scope.events[0].eventDate);
  kontributeEvents.set("Description", $scope.events[0].Description);

  var oldTitle = $scope.events[0].Address;
  $scope.events[0].Address = temp; 
  kontributeEvents.save(null, {
    success: function(kontributeEvents) {
      kontributeEvents.set("Address", temp);
      kontributeEvents.save();
    }
  });
}

$scope.updateDate = function(changes){
  var KontributeEvents = Parse.Object.extend("KontributeEvent")
  var kontributeEvents = new KontributeEvents();
  var user = Parse.User.current();
  kontributeEvents.set("objectId", $scope.events[0].objectID);
  kontributeEvents.set("Address", $scope.events[0].Address);
  kontributeEvents.set("Title", $scope.events[0].Title);
  kontributeEvents.set("Time",$scope.events[0].Time);
  kontributeEvents.set("Date", $scope.events[0].eventDate);
  kontributeEvents.set("Description", $scope.events[0].Description);

  var temp = 'date'; 
  var oldTitle = $scope.events[0].eventDate;
  $scope.events[0].eventDate = changes; 
  kontributeEvents.save(null, {
    success: function(kontributeEvents) {
      kontributeEvents.set("Date", changes);
      kontributeEvents.save();
    }
  });
}

$scope.updateDescription = function(changes){
  var KontributeEvents = Parse.Object.extend("KontributeEvent")
  var kontributeEvents = new KontributeEvents();
  var user = Parse.User.current();
  kontributeEvents.set("objectId", $scope.events[0].objectID);
  kontributeEvents.set("Address", $scope.events[0].Address);
  kontributeEvents.set("Title", $scope.events[0].Title);
  kontributeEvents.set("Time",$scope.events[0].Time);
  kontributeEvents.set("Date", $scope.events[0].eventDate);
  kontributeEvents.set("Description", $scope.events[0].Description);

  var temp = 'descriptione'; 
  var oldTitle = $scope.events[0].Description;
  $scope.events[0].Description = changes; 
  kontributeEvents.save(null, {
    success: function(kontributeEvents) {
      kontributeEvents.set("Description", changes);
      kontributeEvents.save();
    }
  });
}







$scope.gotoEditPage = function(){
  $state.go('app.editEvent'); 
  
}


$scope.showEvent = function(ele){
  var eve = $scope.events[ele]; 
  
  $scope.selecteds = []; 
  $scope.selecteds[0] = eve; 

  
  $scope.selectedVal = true; 


  console.log($scope.selecteds); 
}




    $scope.getEventsForMap = function(){
         var data = eventFactory.getEventsForMap($scope.userName);  
           $scope.events = []; 
       var user = Parse.User.current(); 
              data.equalTo("user", user); 
              data.find({
                success: function(results){
                  for(i in results){
                    $scope.kEvent = []; 
                    $scope.kEvent[i] = results[i];  
              
               $scope.events[i] = { 
                Title:  $scope.kEvent[i].get("Title"), 
                eventDate: $scope.kEvent[i].get("Date"), 
                Time: $scope.kEvent[i].get("Time"), 
                Address: $scope.kEvent[i].get("Address"), 
                Description: $scope.kEvent[i].get("Description"),
                objectID: $scope.kEvent[i].id,
                
            }; 
            

console.log($scope.events[i]);

                  }
                }
              })

        

    };





});
