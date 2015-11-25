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

    factory.createKontributeList = function(kontribute) {
                var num = kontribute.List.toString(); 
                var url = "https://torrid-torch-6578.firebaseio.com/imran1/event/klist"+ num +".json";
                $http.put(url, { list: kontribute })
                .success(function(data, status, headers, config) {
                    console.log(data); 
                    
                }).
                error(function(data, status, headers, config) {
                    ("error"); 
                }); 

             }

    factory.updatelist1 = function(kontribute) {
                var url = "https://torrid-torch-6578.firebaseio.com/imran1/event/klist1/list.json";
                $http.patch(url, { Listdetailsc: kontribute })
                .success(function(data, status, headers, config) {
                    console.log(data); 
                    
                }).
                error(function(data, status, headers, config) {
                    ("error"); 
                }); 

             }

    factory.updatelist2 = function(kontribute) {
                var url = "https://torrid-torch-6578.firebaseio.com/imran1/event/klist2/list.json";
                $http.patch(url, { Listdetailsc: kontribute })
                .success(function(data, status, headers, config) {
                    console.log(data); 
                    
                }).
                error(function(data, status, headers, config) {
                    ("error"); 
                }); 

             }



    factory.updateLocalEventIfTitleChanged = function(changes, oldTitle, userName) {
            if(changes.Title != oldTitle){
            var oldTitle = new Firebase("https://torrid-torch-6578.firebaseio.com/"+ userName +"/host/" + oldTitle);
            oldTitle.remove(); 
            }
            var newTitle = changes.Title; 
            var url = "https://torrid-torch-6578.firebaseio.com/"+ userName +"/host/" + newTitle + ".json"; 
                 $http.put(url, { event: changes })
                .success(function(data, status, headers, config) {
                    console.log(data); 
                    
                }).
                error(function(data, status, headers, config) {
                    ("error"); 
                }); 

             }



    factory.createLocalEvent = function(localEvent, userName) {
                var localEventTitle = localEvent.Title.toLowerCase(); 
                var url = "https://torrid-torch-6578.firebaseio.com/"+ userName +"/host/" + localEventTitle + ".json";
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

    factory.getKontributeLists = function(userName) {
             var url = "https://torrid-torch-6578.firebaseio.com/imran1.json";
                return $http.get(url)
                .success(function (data, status, headers, config) {                
                        console.log(data); 
                });
        }

    factory.getAllHostedEvents = function(userName) {
             var url = "https://torrid-torch-6578.firebaseio.com/" + userName + ".json";
                return $http.get(url)
                .success(function (data, status, headers, config) {                
                        console.log(data); 
                });
        }


   factory.getEventsForMap = function(userName) {
             var url = "https://torrid-torch-6578.firebaseio.com/" +userName+ ".json";
                return $http.get(url)
                .success(function (data, status, headers, config) {                
                        console.log(data); 
                });
        }








    return factory;
});
        


