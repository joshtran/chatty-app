const express = require('express');
const SocketServer = require('ws').Server;
const WebSocket = require('ws');
const uuid = require('node-uuid');

// Set the port to 4000
const PORT = 4000;

// Create a new express server
const server = express()
   // Make the express server serve static assets (html, javascript, css) from the /public folder
  .use(express.static('public'))
  .listen(PORT, '0.0.0.0', 'localhost', () => console.log(`Listening on ${ PORT }`));

// Create the WebSockets server
const wss = new SocketServer({ server });

// Set up a callback that will run when a client connects to the server
// When a client connects they are assigned a socket, represented by
// the ws parameter in the callback.
wss.on('connection', (ws) => {
  //Set up callback for when message is received from client at the other end of this pipeline
  ws.on('message', (data) => {

    let messageId = "";
    //Decode JSON string
    let message = JSON.parse(data);
    messageId = uuid.v4();
    let broadcastMessage = JSON.stringify({username: message.username, content: message.content, id: messageId});

    //Send message to all connected clients
    broadcast(broadcastMessage);
  })

  // Set up a callback for when a client closes the socket. This usually means they closed their browser.
  ws.on('close', () => { console.log('Client disconnected')});
});

function broadcast(data) {
  wss.clients.forEach((ws) => {
    //Check which pipelines are open, and broadcast to those
    if (ws.readyState === WebSocket.OPEN) {
      ws.send(data);
    }
  });
};