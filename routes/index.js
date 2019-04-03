const express = require('express');
const route = express.Router();

// static data (array)
const messages = [
 {
   id: 1,
   user: "Pikachu",
   message: "Hello"
 },
 {
   id: 2,
   user: "Ash",
   message: "Goodbye"
 },
 {
   id: 3,
   user: "Misty",
   message: "Well hello again"
 }
];


// Show express webpage => POSTMAN: http://127.0.0.1:3000/
route.get('/', function(request, response, next) {

  // Rendering the express index page
  response.render('index', { title: 'My homepage' });
  response.end();
});



// Get all data entries or query result
// => POSTMAN: http://127.0.0.1:3000/api/v1/messages
// => POSTMAN: http://127.0.0.1:3000/api/v1/messages?user=Ash
route.get('/api/v1/messages', (request, response) => {

  if (!request.query.user) {
      response.json({status:"success",message: "GETTING all messages, count "+ messages.length +" messages"});
      // Show the data (option)
      // response.send(messages);
      // or use
      // response.json(messages);
  }
  else {
      response.json({"message" : "GETTING message with username <b>"+ request.query.user + "<b>"});
  }
});


// Get data entry of a specified id
// => POSTMAN: http://127.0.0.1:3000/api/v1/messages/1
// => POSTMAN: http://127.0.0.1:3000/api/v1/messages/2
// => POSTMAN: http://127.0.0.1:3000/api/v1/messages/3
route.get('/api/v1/messages/:id', (request, response) => {

   // Check if there is a match with an ID existing in the declared static data
   const message = messages.find(my_int => my_int.id === parseInt(request.params.id));

   if(!message){
     response.status(404).json({status:"error","message":"Message with ID " + request.params.id +" does not exist"})
   }
   else {
     // Show data (option)
     //response.json(message);
     response.json({status:"success", message:"GETTING message with ID <b>" + request.params.id + "</b>"});
   }
});


// Update data of a specific id
// => POSTMAN: check screenshot sc1.png
route.put('/api/v1/messages/:id', (request, response) => {

   const message = messages.find(my_int => my_int.id === parseInt(request.params.id));

   if(!message){
     response.status(404).json({status:"error","message":"Message with ID <b>"+ request.params.id +"</b> does not exist"})
   }
   else {
     // Update an item of the array at a specific index
     messages.splice({id: request.params.id}, 1, request.body);
     response.json({status:"success", message: "UPDATING a message with id <b>"+ request.params.id + "</b>"});
   }
});


// Add a new data entry.
// => POSTMAN: check screenshot sc2.png
route.post('/api/v1/messages/', (request, response) => {

   //When a post is received it will increment the id automatically
   const new_message = { id: messages.length + 1, user: request.body.user, message: request.body.message };
   // Add new data item to the end of array
   messages.push(new_message);
   response.json({ status:"success", message:"POSTING a new message for user <b>" + request.body.user +"</b>"});
});




// Delete a data entry with a specified id
// => POSTMAN: check screenshot sc3.png
route.delete('/api/v1/messages/:id', (request, response) => {

  const message_to_delete = messages.find(a => a.id === parseInt(request.params.id));
  // const specific_message = messages.find(a => a.user === parseInt(req.params.user));
   if(!message_to_delete){
     // Show error message when no data item is found with the specified id
     response.status(404).json({status:"error", message:"The id <b>"+request.params.id+"</b> does not exist"})
   }
   else {
      // Find the index of the message at the predefined data
      const index = messages.indexOf(message_to_delete);
      // Remove the item from the predefined date
      messages.splice(index, 1);
      // Send out success message
      response.json({status:"success", message:"DELETING a message with id <b>"+ request.params.id+ "</b>"});
   }
});


module.exports = route;
console.log('Server is running on port', 3000);
