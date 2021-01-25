/**
 * Chat - Server side
 * Node - Express - Web Socket
 */

const express = require("express");
const { Server } = require("ws");
const User = require("./controllers/userController.js"); // active users module
const type = require("./models/messageType.js"); // message types
const INDEX = "/index.html"; // initial websocket client
const messageTypeError = "Unknown Message Type";

const app = express();
const PORT = process.env.PORT || 3000;
const user = new User(); // active users moduless

app.use(express.static(__dirname + "/public")); // expose public folder

const server = app
              .use((req, res) => res.sendFile(INDEX, { root: __dirname }))   
              .listen(PORT, () => console.log(`Listening on ${PORT}`));  

const wss = new Server({ server });

wss.on("connection", (ws) => {    
  ws.on("message", (message) => {
    let data = JSON.parse(message); // parse message data to object

    switch (data.type) {
      case type.OPEN:
        user.addUser(data); // add active user to list
        wss.clients.forEach((client) => { // send user entry message (new client) to all clients
          client.send(JSON.stringify(user.getUserEntry(type.OPEN, data)));
        });        
        break;
      case type.MESSAGE:        
        wss.clients.forEach((client) => {
          client.send(message); // send chat message to all clients
        });
        break;
      case type.CLOSE:        
        user.removeUser(data.id); // remove user from list
        wss.clients.forEach((client) => { // send user entry message (exit) to all clients
          client.send(JSON.stringify(user.getUserEntry(type.CLOSE, data)));
        });         
        break;        
      default:
        console.log(messageTypeError);
    }
  });
});