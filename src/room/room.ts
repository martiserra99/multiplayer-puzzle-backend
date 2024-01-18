import { JsonRoom, Position } from "../types";

import Users from "./room.users";
import Puzzle from "./room.puzzle";
import Pieces from "./room.pieces";

export default class Room {
  private users: Users;
  private puzzle: Puzzle;
  private pieces: Pieces;

  constructor(public id: string) {
    this.users = new Users();
    this.puzzle = new Puzzle();
    this.pieces = new Pieces();
  }

  get numberUsers() {
    return this.users.length;
  }

  set(json: JsonRoom) {
    this.puzzle.set(json.puzzle);
    this.pieces.set(json.pieces);
  }

  get(): JsonRoom {
    return {
      id: this.id,
      users: this.users.get(),
      puzzle: this.puzzle.get(),
      pieces: this.pieces.get(),
    };
  }

  join(id: string) {
    this.users.add(id);
  }

  leave(id: string) {
    this.users.remove(id);
  }

  move(id: string, coords: Position) {
    this.users.move(id, coords);
  }

  rotate(position: number) {
    this.pieces.rotate(position);
  }
}
