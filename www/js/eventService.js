angular.module('kontribute.services', [])
    .service('eventService', function(eventFactory) {

        var vm = this; 
        vm.createEvent = createEvent;
        vm.createLocalEvent = createLocalEvent;
        vm.inviteUserToEvent = inviteUserToEvent; 
        vm.createKontributeList = createKontributeList;
        vm.updateLocalEventIfTitleChanged = updateLocalEventIfTitleChanged; 
        vm.updatelist = updatelist;
        vm.updatelisti = updatelisti;
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
         
        function createKontributeList(listname, listquantity, kcount, userName){

            var kontribute = { 
                List: kcount,
                Listdetails: {
                    Listname: listname,
                },
                Listdetailsc: {
                    Listcurrent: 0,
                },
                Listdetailsq: {
                    Listquantity: listquantity
                },
            }; 

            eventFactory.createKontributeList(kontribute, userName); 
    
             };

        function updatelist(changeq, updateklistnum, userName){

            var kontribute = { 
                Listcurrent: changeq,
            }; 
            
            eventFactory.updatelist(kontribute, updateklistnum, userName); 
        };

        function updatelisti(changeq, updateklistnum, userName){

            var kontribute = { 
                Listcurrent: changeq,
            }; 
            
            eventFactory.updatelisti(kontribute, updateklistnum, userName); 
        };

        function updatelist2(changeq){

            var kontribute = { 
                Listcurrent: changeq,
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




        function updateLocalEventIfTitleChanged(changes, oldTitle, userName){
 
            console.log(userName + "hvhdahfahfa"); 
             var localEvent = { 
                Title:  changes.event.Title, 
                Date: changes.event.Date,
                Time: changes.event.Time,
                Address: changes.event.Address,  
                Description: changes.event.Description, 
                Users : changes.event.Users, 
            };


            eventFactory.updateLocalEventIfTitleChanged(localEvent, oldTitle, userName); 
        }





         
       
    });