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

    factory.createKontributeList = function(kontribute, userName) {
                var num = kontribute.List.toString(); 
                var url = "https://torrid-torch-6578.firebaseio.com/" + userName + "/host/event/kontributelists/klist"+ num +".json";
                $http.put(url, { list: kontribute })
                .success(function(data, status, headers, config) {
                    console.log(data); 
                    
                }).
                error(function(data, status, headers, config) {
                    ("error"); 
                }); 

             }

    factory.updatelist = function(kontribute, updateklistnum, userName) {
                var url = "https://torrid-torch-6578.firebaseio.com/"+ userName +"/host/event/kontributelists/klist"+ updateklistnum +"/list.json";
                $http.patch(url, { Listdetailsc: kontribute })
                .success(function(data, status, headers, config) {
                    console.log(data); 
                    
                }).
                error(function(data, status, headers, config) {
                    ("error"); 
                }); 

             }

    factory.updatelisti = function(kontribute, updateklistnum, userName) {
                var url = "https://torrid-torch-6578.firebaseio.com/"+ userName +"/invited/event/kontributelists/klist"+ updateklistnum +"/list.json";
                $http.patch(url, { Listdetailsc: kontribute })
                .success(function(data, status, headers, config) {
                    console.log(data); 
                    
                }).
                error(function(data, status, headers, config) {
                    ("error"); 
                }); 

            }



    factory.updateLocalEventIfTitleChanged = function(changes, oldTitle, userName) {
            console.log(changes.Title + 'new title' + oldTitle + "newtitel"); 
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
                      //  console.log(data); 
                });
        }

    factory.getKontributeLists = function(userName) {
             var url = "https://torrid-torch-6578.firebaseio.com/"+ userName +"/host/event.json";
                return $http.get(url)
                .success(function (data, status, headers, config) {                
                        console.log(data); 
                });
        }

    factory.getKontributeListsi = function(userName) {
             var url = "https://torrid-torch-6578.firebaseio.com/"+ userName +"/invited/event.json";
                return $http.get(url)
                .success(function (data, status, headers, config) {                
                        console.log(data + "HERE"); 
                });
        }

    factory.getAllHostedEvents = function(userName) {
             var url = "https://torrid-torch-6578.firebaseio.com/" + userName + ".json";
                return $http.get(url)
                .success(function (data, status, headers, config) {                
                      //  console.log(data); 
                });
        }


   factory.getEventsForMap = function(userName) {
             var url = "https://torrid-torch-6578.firebaseio.com/" +userName+ ".json";
                return $http.get(url)
                .success(function (data, status, headers, config) {                
                   //     console.log(data); 
                });
        }

    factory.createInviteList = function(uid, guest, guestUid) {
        var url = 'https://torrid-torch-6578.firebaseio.com/TEMPINV/'+uid+'/invited/'+guestUid+'.json';
        $http.put(url, {friend: guest})
        .success(function(data){
        //    console.log(data);
        }). 
        error(function(data) {
            ("error");
        });

    }


    factory.unInvite = function(uid, guid) {
        console.log('https://torrid-torch-6578.firebaseio.com/TEMPINV/'+uid+'/invited/'+guid);
        var guestRef = new Firebase ('https://torrid-torch-6578.firebaseio.com/TEMPINV/'+uid+'/invited/'+guid);
        guestRef.remove();  
        console.log('remove: '+guid);
    }



   factory.getAllInvitedGusts = function(userName) {
             var url = "https://torrid-torch-6578.firebaseio.com/TEMPINV/" + userName +".json";
                return $http.get(url)
                .success(function (data, status, headers, config) {                
                      //  console.log(data); 
                });
        }






    return factory;
});
        


