﻿angular.module('kontribute.factories', [])
    .factory('eventFactory', function ($http) {
    
    var factory = {}; 
    var url = "https://torrid-torch-6578.firebaseio.com/chris.json";
    var eventId = 11; 

    factory.createEvent = function(newEvent) {
            var jsonValue = JSON.stringify(newEvent); 
            var request = {
                    method: 'PUT', 
                    url: url, 
                    headers: {
              'content-type': 'application/x-www-form-urlencoded'
            },
            data: jsonValue
        }

            var data = {
                EventId: 20, 
                Title: newEvent.Title, 
                Date: "test", 
                Time: 7, 
                Address: "testing", 
                Description: newEvent.Description, 
                Users: newEvent.Users

            }
          
            console.log("this is the data being sent", newEvent); 
        
        
                $http.put(url, { event: newEvent})
                .success(function(data, status, headers, config) {
                    console.log(data); 
                }).
                error(function(data, status, headers, config) {
                    ("error"); 
                }); 

             }

    factory.getAllUsers = function(number) {
             console.log("here in FAC"); 
                return $http.get(url)
                .success(function (data, status, headers, config) {                
                        console.log(data); 
                });
        }

    return factory;
});
        


