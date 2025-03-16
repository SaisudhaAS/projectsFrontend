const WebSocket = require("ws");

const server = new WebSocket.Server({ port: 3000 });

let rooms = { general: [] }; 
let users = {}; 

server.on("connection", (ws) => {
    ws.send(JSON.stringify({ type: "rooms", rooms: Object.keys(rooms) }));

    ws.on("message", (message) => {
        let data;
        try {
            data = JSON.parse(message);
        } catch (error) {
            console.error("Invalid JSON:", message);
            return;
        }

        if (data.type === "join") {
            if (users[data.username]) {
                ws.send(JSON.stringify({ type: "error", message: "Username already taken" }));
                return;
            }
            users[data.username] = ws;

            
            if (!rooms[data.room]) {
                rooms[data.room] = [];
            }

            rooms[data.room].push(ws);
            ws.room = data.room;
            ws.username = data.username;
        } 
        else if (data.type === "message") {
            if (!rooms[data.room]) {
                ws.send(JSON.stringify({ type: "error", message: "Room does not exist" }));
                return;
            }

            
            rooms[data.room].forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(JSON.stringify({ 
                        type: "message", 
                        username: data.username, 
                        message: data.message 
                    }));
                }
            });
        }
    });

    ws.on("close", () => {
        if (ws.username) {
            delete users[ws.username];

            
            if (ws.room && rooms[ws.room]) {
                rooms[ws.room] = rooms[ws.room].filter(client => client !== ws);
                if (rooms[ws.room].length === 0) {
                    delete rooms[ws.room]; 
                }
            }
        }
    });
});

console.log("WebSocket server running on ws://localhost:3000");
