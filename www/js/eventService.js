angular.module('kontribute.services', [])
    .service('eventService', function(eventFactory) {

        var vm = this; 
        vm.createEvent = createEvent;
        vm.createLocalEvent = createLocalEvent;
        vm.inviteUserToEvent = inviteUserToEvent; 
        vm.createKontributeList = createKontributeList;
        vm.updatelist1 = updatelist1;
        vm.updatelist2 = updatelist2;
        vm.data;
        vm.events = {}; 

        

      
        function createEvent(title, date, time, street, city, province, description, guests){

            var globalEvent = { 
                Title:  title, 
                Date: date, 
                Time: time, 
                Address: street +", "+ city + ", " + province, 
                Description: description, 
                Users : guests , 
            }; 

            console.log(globalEvent.Title + " new event"); 
            eventFactory.createEvent(globalEvent); 
    
             };
         
        function createKontributeList(list1name, list1quantity, kcount){

            var kontribute = { 
                List1: kcount,
                List1details: {
                    List1name: list1name,
                },
                List1detailsc: {
                    List1current: "0",
                },
                List1detailsq: {
                    List1quantity: list1quantity
                },
            }; 
            
            eventFactory.createKontributeList(kontribute); 
    
             };

        function updatelist1(changeq){

            var kontribute = { 
                List1current: changeq,
            }; 
            
            eventFactory.updatelist1(kontribute); 
        };

        function updatelist2(changeq){

            var kontribute = { 
                List2current: changeq,
            }; 
            
            eventFactory.updatelist2(kontribute); 
        };


       function createLocalEvent(title, date, time, street, city, province, description, guests, userName){

            var localEvent = { 
                Title:  title, 
                Date: date, 
                Time: time, 
                Address: street +", "+ city + ", " + province, 
                Description: description, 
                Users : guests , 
            }; 
            
            eventFactory.createLocalEvent(localEvent, userName); 
    
             };
   
            

        function inviteUserToEvent(title, date, time, street, city, province, description, guests){
            var nameOfGuest = guests; 

            var localEvent = { 
                Title:  title, 
                Date: date, 
                Time: time, 
                Address: street +", "+ city + ", " + province,  
                Description: description, 
                Users : guests , 
            }; 
            
            eventFactory.inviteUserToEvent(nameOfGuest, localEvent); 
    
             };
         
       
    });