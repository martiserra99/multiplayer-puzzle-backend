import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

io.on("connection", (socket: any) => {
  console.log("a user connected");
});

server.listen(3000, () => {
  console.log();
});
