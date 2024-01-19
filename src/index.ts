import dotenv from "dotenv";
import express from "express";
import { createServer } from "http";
import { Server, Socket } from "socket.io";

import Room from "./room";
import User from "./room/user";

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

  socket.on(
    "room:get",
    withRoom(({ room }) => {
      io.to(room.id).emit("room:get", room.json);
    })
  );

  socket.on(
    "room:move",
    withUser(socket, ({ room, user, coords }) => {
      room.move(user, coords);
      io.to(room.id).emit("room:get", room.json);
    })
  );

  socket.on(
    "room:mouseup",
    withUser(socket, ({ room, user, coords }) => {
      room.mouseup(user, coords);
      io.to(room.id).emit("room:get", room.json);
    })
  );

  socket.on(
    "room:rotate",
    withUser(socket, ({ room, user, position }) => {
      room.rotate(user, position);
      io.to(room.id).emit("room:get", room.json);
    })
  );

  socket.on(
    "room:rotate-focus",
    withUser(socket, ({ room, user, position }) => {
      room.rotateFocus(user, position);
      io.to(room.id).emit("room:get", room.json);
    })
  );

  socket.on(
    "room:select-from-pieces",
    withUser(socket, ({ room, user, id, offset }) => {
      room.selectFromPieces(user, id, offset);
      io.to(room.id).emit("room:get", room.json);
    })
  );

  socket.on(
    "room:select-from-puzzle",
    withUser(socket, ({ room, user, id, offset }) => {
      room.selectFromPuzzle(user, id, offset);
      io.to(room.id).emit("room:get", room.json);
    })
  );

  socket.on("disconnect", () => {
    console.log("disconnected");
    for (let i = 0; i < rooms.length; i++) {
      const room = rooms[i];
      if (room.user(socket.id)) {
        room.leave(socket.id);
        if (room.numberUsers === 0) {
          rooms.splice(i, 1);
          i--;
        } else {
          io.to(room.id).emit("room:get", room.json);
        }
      }
    }
  });
});

function withRoom(
  callback: ({ room, ...args }: { room: Room; [key: string]: any }) => void
) {
  return ({ roomId, ...args }: { roomId: string; args: any[] }) => {
    const room = rooms.find((room) => room.id === roomId);
    if (room) {
      callback({ room, ...args });
    }
  };
}

function withUser(
  socket: Socket,
  callback: ({
    room,
    user,
    ...args
  }: {
    room: Room;
    user: User;
    [key: string]: any;
  }) => void
) {
  return withRoom(({ room, ...args }: { room: Room; [key: string]: any }) => {
    const user = room.user(socket.id);
    if (user) {
      callback({ room, user, ...args });
    }
  });
}

server.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.PORT}`);
});
