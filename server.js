/**
 * Chat - Server side
 * Node - Express - Web Socket
 */

const express = require("express");
const { Server } = require("ws");
const ActiveUsers = require("./controllers/ActiveUsers.js"); // active users module
const messageType = require("./models/messageType.js"); // message types
const messageTypeError = "Unknown Message Type";

const app = express();
const PORT = process.env.PORT || 3000;
const INDEX = "/index.html"; // initial websocket client
const activeUsers = new ActiveUsers(); // active users moduless

app.use(express.static(__dirname + "/public")); // expose public folder

const server = app
              .use((req, res) => res.sendFile(INDEX, { root: __dirname }))   
              .listen(PORT, () => console.log(`Listening on ${PORT}`));  

const wss = new Server({ server });

wss.on("connection", (ws) => {    
  ws.on("message", (message) => {
    let data = JSON.parse(message); // parse message data to object

    switch (data.type) {
      case messageType.OPEN:
        activeUsers.pushNewUser(data); // add active user to list
        wss.clients.forEach((client) => { // send user entry message (new client) to all clients
          client.send(JSON.stringify(activeUsers.createUserEntry(messageType.OPEN, data)));
        });        
        break;
      case messageType.MESSAGE:        
        wss.clients.forEach((client) => {
          client.send(message); // send chat message to all clients
        });
        break;
      case messageType.CLOSE:        
        activeUsers.removeUser(data.id); // remove user from list
        wss.clients.forEach((client) => { // send user entry message (exit) to all clients
          client.send(JSON.stringify(activeUsers.createUserEntry(messageType.CLOSE, data)));
        });         
        break;        
      default:
        console.log(messageTypeError);
    }
  });
});