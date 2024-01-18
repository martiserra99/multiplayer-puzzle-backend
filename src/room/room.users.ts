import { JsonUsers, Position } from "../types";

const random = (max: number) => Math.floor(Math.random() * max);

export default class Users {
  private json: JsonUsers;

  constructor() {
    this.json = [];
  }

  set(json: JsonUsers) {
    this.json = json;
  }

  get(): JsonUsers {
    return this.json;
  }

  add(id: string) {
    this.json.push({
      id,
      style: random(10),
      coords: { x: 0, y: 0 },
      selected: null,
    });
  }

  move(id: string, coords: Position) {
    const user = this.json.find((user) => user.id === id);
    if (!user) return;
    user.coords = coords;
  }
}
