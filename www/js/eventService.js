angular.module('kontribute.services', [])
    .service('eventService', function(eventFactory) {

        var vm = this; 
        vm.createEvent = createEvent;
        vm.createLocalEvent = createLocalEvent;
        vm.inviteUserToEvent = inviteUserToEvent; 
        vm.data;
        vm.events = {}; 

        

      
        function createEvent(title, date, time, street, city, province, description, guests){

            var globalEvent = { 
                Title:  title, 
                Date: date, 
                Time: time, 
                Address: street +","+ city + "," + province, 
                Description: description, 
                Users : guests , 
            }; 

            console.log(globalEvent.Title + " new event"); 
            eventFactory.createEvent(globalEvent); 
    
             };
         

       function createLocalEvent(title, date, time, street, city, province, description, guests){

            var localEvent = { 
                Title:  title, 
                Date: date, 
                Time: time, 
                Address: street +","+ city + "," + province, 
                Description: description, 
                Users : guests , 
            }; 
            
            eventFactory.createLocalEvent(localEvent); 
    
             };
   
            

        function inviteUserToEvent(title, date, time, street, city, province, description, guests){
            var nameOfGuest = guests; 

            var localEvent = { 
                Title:  title, 
                Date: date, 
                Time: time, 
                Address: street +","+ city + "," + province,  
                Description: description, 
                Users : guests , 
            }; 
            
            eventFactory.inviteUserToEvent(nameOfGuest, localEvent); 
    
             };
         
       
    });