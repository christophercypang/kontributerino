angular.module('kontribute.services', [])
    .service('eventService', function(eventFactory) {

        var vm = this; 
        vm.createEvent = createEvent;
        vm.data;
        vm.events = {}; 

        

      
        function createEvent(title, date, time, address, description, guests){
            var newEvent = { 
                Title:  title, 
                Date: date, 
                Time: time, 
                Address: address, 
                Description: description, 
                Users: guests, 
            }; 

            console.log(newEvent.Time + " new event"); 
            eventFactory.createEvent(newEvent); 
    
             };
         

       
   
            

         
       
    });