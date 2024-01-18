import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

import Room from "./room/room";

dotenv.config();

const app = express();
const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

const rooms: Room[] = [];

io.on("connection", (socket: Socket) => {
  console.log("connected");

  socket.on("room:join", ({ roomId }, callback) => {
    const room = rooms.find((room) => room.id === roomId);
    if (room) {
      room.join(socket.id);
    } else {
      const room = new Room(roomId);
      rooms.push(room);
      room.join(socket.id);
    }
    socket.join(roomId);
    callback();
  });

  socket.on("room:get", ({ roomId }) => {
    const room = rooms.find((room) => room.id === roomId);
    if (!room) return;
    io.to(roomId).emit("room:get", room.get());
  });

  socket.on("room:move", ({ roomId, coords }) => {
    const room = rooms.find((room) => room.id === roomId);
    if (!room) return;
    room.move(socket.id, coords);
    io.to(roomId).emit("room:get", room.get());
  });

  socket.on("room:rotate", ({ roomId, position }) => {
    const room = rooms.find((room) => room.id === roomId);
    if (!room) return;
    room.rotate(position);
    io.to(roomId).emit("room:get", room.get());
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
