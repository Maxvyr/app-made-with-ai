const { Server } = require("socket.io");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(".")); // Serve static files (like your HTML, JS, and assets)

const blocks = {}; // Shared state for all blocks

// Handle new connections
io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);

  // Send existing blocks to new player
  socket.emit("initialBlocks", blocks);

  // Handle block placement
  socket.on("addBlock", (data) => {
    const { x, y, z } = data;
    const key = `${x},${y},${z}`;
    if (!blocks[key]) {
      blocks[key] = { x, y, z };
      io.emit("addBlock", { x, y, z }); // Broadcast to all clients
    }
  });

  // Handle block removal
  socket.on("removeBlock", (data) => {
    const { x, y, z } = data;
    const key = `${x},${y},${z}`;
    if (blocks[key]) {
      delete blocks[key];
      io.emit("removeBlock", { x, y, z }); // Broadcast to all clients
    }
  });

  // Handle disconnection
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
  });
});

const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
