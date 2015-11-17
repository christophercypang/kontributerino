angular.module('kontribute.factories', [])
    .factory('eventFactory', function ($http) {
    
    var factory = {}; 
    var eventId = 11; 

    factory.createEvent = function(newEvent) {
                var globalEventTitle = newEvent.Title.toLowerCase(); 
                var url = "https://torrid-torch-6578.firebaseio.com/" + globalEventTitle + ".json";
                $http.put(url, { event: newEvent})
                .success(function(data, status, headers, config) {
                    console.log(data); 

                }).
                error(function(data, status, headers, config) {
                    ("error"); 
                }); 

             }

    factory.createLocalEvent = function(localEvent) {
                var localEventTitle = localEvent.Title.toLowerCase(); 
                var url = "https://torrid-torch-6578.firebaseio.com/imran/host/" + localEventTitle + ".json";
                //var eve = [localEventTitle];
                $http.put(url, { event: localEvent })
                .success(function(data, status, headers, config) {
                    console.log(data); 
                    
                }).
                error(function(data, status, headers, config) {
                    ("error"); 
                }); 

             }


     factory.inviteUserToEvent = function(guests, eventDetails) {
                var eventTitle = eventDetails.Title.toLowerCase();
                var guestName = eventDetails.Users.toLowerCase();  
                var url = "https://torrid-torch-6578.firebaseio.com/" + guestName + "/invited/" + eventTitle + ".json";
                //var eve = [localEventTitle];
                $http.put(url, { event: eventDetails })
                .success(function(data, status, headers, config) {
                    console.log(data); 
                    
                }).
                error(function(data, status, headers, config) {
                    ("error"); 
                }); 

             }



    factory.getAllEvents = function(number) {
             console.log("here in FAC"); 
                return $http.get(url)
                .success(function (data, status, headers, config) {                
                        console.log(data); 
                });
        }

    factory.getAllHostedEvents = function() {
             var url = "https://torrid-torch-6578.firebaseio.com/imran.json";
                return $http.get(url)
                .success(function (data, status, headers, config) {                
                        console.log(data); 
                });
        }


   factory.getEventsForMap = function() {
             var url = "https://torrid-torch-6578.firebaseio.com/chris.json";
                return $http.get(url)
                .success(function (data, status, headers, config) {                
                        console.log(data); 
                });
        }








    return factory;
});
        


