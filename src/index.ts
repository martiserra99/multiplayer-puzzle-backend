import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

import { JsonRoom } from "./types";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const rooms: JsonRoom[] = [];

io.on("connection", (socket: Socket) => {
  console.log("connected");

  socket.on("room:join", ({ roomId }, callback) => {
    // const room = rooms.find((room) => room.id === roomId);
    // if (!room) {
    //   rooms.push({
    //     id: roomId,
    //     users: {
    //       [socket.id]: [],
    //     },
    //   });
    // } else {
    //   room.users[socket.id] = [];
    // }
    // socket.join(roomId);
    // callback();
  });

  socket.on("room:get", ({ roomId }) => {
    const room = rooms.find((room) => room.id === roomId);
    if (!room) return;
    io.to(roomId).emit("room:get", room);
  });

  socket.on("room:click", ({ roomId, coords }) => {
    // const room = rooms.find((room) => room.id === roomId);
    // if (!room) return;
    // room.users[socket.id].push(coords);
    // io.to(roomId).emit("room:get", room);
  });

  socket.on("disconnect", () => {
    console.log("disconnected");
    // for (let i = 0; i < rooms.length; i++) {
    //   const room = rooms[i];
    //   if (room.users[socket.id]) {
    //     delete room.users[socket.id];
    //     if (Object.keys(room.users).length === 0) {
    //       rooms.splice(i, 1);
    //     }
    //     i--;
    //   }
    // }
  });
});

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
