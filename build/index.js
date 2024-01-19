"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const room_1 = __importDefault(require("./room"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const server = (0, http_1.createServer)(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "*",
    },
});
const rooms = [];
io.on("connection", (socket) => {
    console.log("connected");
    socket.on("room:join", ({ roomId }, callback) => {
        const room = rooms.find((room) => room.id === roomId);
        if (room) {
            room.join(socket.id);
        }
        else {
            const room = new room_1.default(roomId);
            rooms.push(room);
            room.join(socket.id);
        }
        socket.join(roomId);
        callback();
    });
    socket.on("room:get", withRoom(({ room }) => {
        io.to(room.id).emit("room:get", room.json);
    }));
    socket.on("room:move", withUser(socket, ({ room, user, coords }) => {
        room.move(user, coords);
        io.to(room.id).emit("room:get", room.json);
    }));
    socket.on("room:mouseup", withUser(socket, ({ room, user, coords }) => {
        room.mouseup(user, coords);
        io.to(room.id).emit("room:get", room.json);
    }));
    socket.on("room:rotate", withUser(socket, ({ room, user, position }) => {
        room.rotate(user, position);
        io.to(room.id).emit("room:get", room.json);
    }));
    socket.on("room:rotate-focus", withUser(socket, ({ room, user, position }) => {
        room.rotateFocus(user, position);
        io.to(room.id).emit("room:get", room.json);
    }));
    socket.on("room:select-from-pieces", withUser(socket, ({ room, user, id, offset }) => {
        room.selectFromPieces(user, id, offset);
        io.to(room.id).emit("room:get", room.json);
    }));
    socket.on("room:select-from-puzzle", withUser(socket, ({ room, user, id, offset }) => {
        room.selectFromPuzzle(user, id, offset);
        io.to(room.id).emit("room:get", room.json);
    }));
    socket.on("disconnect", () => {
        console.log("disconnected");
        for (let i = 0; i < rooms.length; i++) {
            const room = rooms[i];
            if (room.user(socket.id)) {
                room.leave(socket.id);
                if (room.numberUsers === 0) {
                    rooms.splice(i, 1);
                    i--;
                }
                else {
                    io.to(room.id).emit("room:get", room.json);
                }
            }
        }
    });
});
function withRoom(callback) {
    return (_a) => {
        var { roomId } = _a, args = __rest(_a, ["roomId"]);
        const room = rooms.find((room) => room.id === roomId);
        if (room) {
            callback(Object.assign({ room }, args));
        }
    };
}
function withUser(socket, callback) {
    return withRoom((_a) => {
        var { room } = _a, args = __rest(_a, ["room"]);
        const user = room.user(socket.id);
        if (user) {
            callback(Object.assign({ room, user }, args));
        }
    });
}
server.listen(process.env.PORT, () => {
    console.log(`Listening on port ${process.env.PORT}`);
});
