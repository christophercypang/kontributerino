// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('kontribute', ['ionic', 'ngCordova', 'kontribute.controllers', 'kontribute.services', 'kontribute.factories', 'kontribute.authFactory','kontribute.usersFactory','firebase' ])


.config(function($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('bottom');
})


.run(function($ionicPlatform) {

  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)

   // setTimeout(function() {
   //      navigator.splashscreen.hide();
   //  }, 100)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);



    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }



 Parse.initialize('FMq0Oa8GDND7cVrvVSllAAZiYjlpb3DHvaTk5WFX','Dvpbv2XOFsVmFxtIs4BY3N7FbKM6EAj2JwC5RvQ9'); 
  
 


//     var TestObject = Parse.Object.extend("TestObject");
// var testObject = new TestObject();
// testObject.save({foo: "bar"}).then(function(object) {
//   alert("yay! it worked");
// });
    ionic.Platform.isFullScreen = true;
  });

 


  })













.config(function ($compileProvider, $stateProvider, $urlRouterProvider) {

    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|ghttps?|ms-appx|x-wmapp0):/);

    $compileProvider.imgSrcSanitizationWhitelist(/^\s*(https?|ftp|file|ms-appx|x-wmapp0):|data:image\//);

    $stateProvider

    .state('app', {
        url: "/app",
        abstract: true,
        templateUrl: "templates/menu.html",
        controller: 'AppCtrl'
    })

    .state('app.home', {
        url: "/home",
        views: {
            'menuContent': {
                templateUrl: "templates/home.html"
            }
        }
    })

          .state('app.create', {
              url: "/create",
              views: {
                  'menuContent': {
                      templateUrl: "templates/create.html"
                  }
              }
              
          })

          .state('app.settings', {
              url: "/settings",
              views: {
                  'menuContent': {
                      templateUrl: "templates/settings.html"
                  }
              }
          })
            .state('app.guestList', {
              url: "/guestList",
              views: {
                  'menuContent': {
                      templateUrl: "templates/guestList.html"
                  }
              }
          })

           .state('app.eventTemplate', {
               url: "/eventTemplate",
               views: {
                   'menuContent': {
                       templateUrl: "templates/eventTemplate.html"
                   }
               }
           })

          .state('app.host', {
              url: "/host",
              views: {
                  'menuContent': {
                      templateUrl: "templates/host.html"
                  }
              }, 
              cache: false
          })

          .state('app.vote', {
          url: "/vote",
          views: {
            'menuContent': {
              templateUrl: "templates/vote.html"

            }
          }
        })

        .state('app.kontribution', {
          url: "/kontribution",
          views: {
            'menuContent': {
              templateUrl: "templates/kontribution.html"
            }
          }
        })
         .state('app.donotdelete', {
          url: "/donotdelete",
          views: {
            'menuContent': {
              templateUrl: "templates/donotdelete.html"
            }
          }
        })



          .state('app.events', {
            url: "/events",
            views: {
                'menuContent': {
                    templateUrl: "templates/events.html"
                }
            }
        })

        .state('app.currkontribute', {
            url: "/currkontribute",
            views: {
                'menuContent': {
                    templateUrl: "templates/currkontribute.html"
                }
            }
        })

        .state('app.kontribute', {
            url: "/kontribute",
            views: {
                'menuContent': {
                    templateUrl: "templates/kontribute.html"
                }
            }
        })

          .state('app.login', {
            url:'/login',
            views: {
              'menuContent': {
                templateUrl:'templates/login.html',
                controller: 'AuthCtrl as authCtrl' 
              }
            },

        
      })
        

          .state('app.register', {
            url:'/register',
            views: {
              'menuContent': {
                templateUrl: 'templates/register.html',
                controller: 'AuthCtrl as authCtrl'
              }
            }
          })

            .state('app.editEvent', {
            url:'/editEvent',
            views: {
              'menuContent': {
                templateUrl: 'templates/editEvent.html',
               
              }
            }, 
            cache: false

          })

          .state('app.profile', {
            url:'/profile',
            views: {
              'menuContent': {
                templateUrl: 'templates/profile.html',
                controller: 'ProfileCtrl as profileCtrl'
              }
            },
          cache: false
          })

    

    $urlRouterProvider.otherwise('/app/home');
})


.constant('FirebaseUrl', 'https://torrid-torch-6578.firebaseio.com/' );
