
const express = require("express");
const { Server } = require("ws");
const ActiveUsers = require("./controllers/ActiveUsers.js");

const app = express();
const PORT = process.env.PORT || 3000;
const INDEX = "/index.html";
const activeUsers = new ActiveUsers();

app.use(express.static(__dirname + "/public")); 

const server = app
              .use((req, res) => res.sendFile(INDEX, { root: __dirname }))   
              .listen(PORT, () => console.log(`Listening on ${PORT}`));  

const wss = new Server({ server });

wss.on("connection", (ws) => {    
  ws.on("message", (message) => {
    let data = JSON.parse(message);    

    switch (data.type) {
      case "onopen":
        activeUsers.pushNewUser(data);        
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(activeUsers.createUserEntry("onopen", data)));
        });        
        break;
      case "chat-message":        
        wss.clients.forEach((client) => {
          client.send(message);
        });
        break;
      case "onclose":        
        activeUsers.removeUser(data.id);        
        wss.clients.forEach((client) => {
          client.send(JSON.stringify(activeUsers.createUserEntry("onclose", data)));
        });         
        break;        
      default:
        console.log("Unknown Message Type");
    }
  });
});