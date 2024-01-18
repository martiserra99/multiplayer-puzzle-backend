import { JsonUsers } from "../types";

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
    this.json.push({ id, coords: { x: 0, y: 0 }, selected: null });
  }
}
