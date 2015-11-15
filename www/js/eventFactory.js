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

    factory.getAllEvents = function(number) {
             console.log("here in FAC"); 
                return $http.get(url)
                .success(function (data, status, headers, config) {                
                        console.log(data); 
                });
        }

    return factory;
});
        


