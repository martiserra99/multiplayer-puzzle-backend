"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
class Users {
    constructor() {
        this.users = [];
    }
    [Symbol.iterator]() {
        return this.users[Symbol.iterator]();
    }
    get json() {
        return this.users.map((user) => user.json);
    }
    get length() {
        return this.json.length;
    }
    join(id) {
        this.users.push(new user_1.default(id));
    }
    user(id) {
        return this.users.find((user) => user.id === id);
    }
    leave(id) {
        this.users = this.users.filter((user) => user.id !== id);
    }
}
exports.default = Users;
