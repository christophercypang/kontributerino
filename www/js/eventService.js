angular.module('kontribute.services', [])
    .service('eventService', function(eventFactory) {

        var vm = this; 
        vm.createEvent = createEvent;
        vm.createLocalEvent = createLocalEvent;
        vm.data;
        vm.events = {}; 

        

      
        function createEvent(title, date, time, address, description, guests){

            var globalEvent = { 
                Title:  title, 
                Date: date, 
                Time: time, 
                Address: address, 
                Description: description, 
                Users : guests , 
            }; 

            console.log(globalEvent.Title + " new event"); 
            eventFactory.createEvent(globalEvent); 
    
             };
         

       function createLocalEvent(title){


            
            eventFactory.createLocalEvent(title); 
    
             };
   
            

         
       
    });