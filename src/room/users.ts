import User from "./user";

import { JsonUsers } from "../types";

export default class Users {
  public users: User[];

  constructor() {
    this.users = [];
  }

  get json(): JsonUsers {
    return this.users.map((user) => user.json);
  }

  get length(): number {
    return this.json.length;
  }

  join(id: string): void {
    this.users.push(new User(id));
  }

  user(id: string): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  leave(id: string): void {
    this.users = this.users.filter((user) => user.id !== id);
  }
}
