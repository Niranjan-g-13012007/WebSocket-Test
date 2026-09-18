const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);

// Socket.IO setup
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

// Middleware
app.use(cors());
app.use(express.json());


// Test route
app.get("/", (req, res) => {
    res.send("Energy Monitoring Backend is running");
});


// ESP32 will send sensor readings here
app.post("/api/readings", (req, res) => {

    const data = req.body;

    console.log("Received data:");
    console.log(data);

    // Send data to React
    io.emit("sensorData", data);

    res.json({
        success: true,
        message: "Data received successfully"
    });
});


// React connection
io.on("connection", (socket) => {

    console.log("React client connected:", socket.id);

    socket.on("disconnect", () => {
        console.log("React client disconnected:", socket.id);
    });

});


// Start server
const PORT = 5000;

server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
});