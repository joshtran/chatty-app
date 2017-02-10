const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuid = require('node-uuid');


const PORT = 4000;
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));
const wss = new SocketServer({ server });

let userCount = 0;

wss.on('connection', (ws) => {
  userCount += 1;
  broadcast(JSON.stringify({type: "numUsers", usercount: userCount}));

  //Set up callback for when message is received from client at the other end of this pipeline
  ws.on('message', (data) => {
    let message = JSON.parse(data);
    let broadcastMessage = "";
    let messageId = "";

    if (message.type === "newMessage") {
      messageId = uuid.v4();
      broadcastMessage = JSON.stringify({username: message.username, content: message.content, id: messageId, type: message.type});
    }
    if (message.type === "newName") {
      messageId = uuid.v4();
      broadcastMessage = JSON.stringify({newname: message.newname, oldname: message.oldname, content: message.content, id: messageId, type: message.type});
    }

    broadcast(broadcastMessage);
  });

  // Set up a callback for when a client closes the socket - decrement counter
  ws.on('close', () => {
    userCount -= 1;
    broadcast(JSON.stringify({type: "numUsers", usercount: userCount}));
    console.log('Client disconnected');
  });
});

function broadcast(data) {
  wss.clients.forEach((ws) => {
    //Check which pipelines are open, and broadcast to those
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  });
};