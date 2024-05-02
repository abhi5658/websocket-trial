const WebSocket = require('ws');
const url = require('url')

// Create a new WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

// Map to store connected clients and their user IDs
const clients = new Map();

// When a new client connects
wss.on('connection', (ws, req) => {
    // Generate a random user ID between 1 and 700
    let userId = Math.floor(Math.random() * 700) + 1;
    const queryParams = url.parse(req.url, true).query;
    if (queryParams.big_id === "1") {
        userId = Math.floor(Math.random() * 300) + 700;
    }
    ws.send(`User ID ${userId}`);

    // Add the client and user ID to the clients map
    clients.set(ws, userId);

    console.log(`Client connected with user ID ${userId}`);

    // When the server receives a message from a client
    ws.on('message', (message) => {
        console.log(`Received message from user ID ${userId}: ${message}`);

        // Broadcast the message to other clients with user ID less than 100
        for (const [client, id] of clients) {
            if (id < 700 && id !== userId) {
                console.log(`out to ${userId}: ${message}`)
                client.send(`User ID ${userId}: ${message}`);
            } else if (id == userId) {
                client.send(`Acknowledgement: ${userId}: ${message}`);
            }
        }
    });

    // When a client disconnects
    ws.on('close', () => {
        clients.delete(ws);
        console.log(`Client with user ID ${userId} disconnected`);
    });
});

console.log('WebSocket server started on port 8080');