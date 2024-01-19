import { JsonRoom, Position } from "../types";

import Users from "./room.users";
import Puzzle from "./room.puzzle";
import Pieces from "./room.pieces";
import User from "./room.user";

export default class Room {
  private users: Users;
  private puzzle: Puzzle;
  private pieces: Pieces;

  constructor(public id: string) {
    this.users = new Users();
    this.puzzle = new Puzzle();
    this.pieces = new Pieces();
  }

  get json(): JsonRoom {
    return {
      id: this.id,
      users: this.users.json,
      puzzle: this.puzzle.json,
      pieces: this.pieces.json,
    };
  }

  get numberUsers(): number {
    return this.users.length;
  }

  join(id: string): void {
    this.users.join(id);
  }

  user(id: string): User | undefined {
    return this.users.user(id);
  }

  leave(id: string): void {
    this.users.leave(id);
  }

  move(user: User, coords: Position): void {
    user.move(coords);
  }

  // mouseup(id: string): void {
  //   this.users.mouseup(id);
  // }

  // rotatePiece(position: number) {
  //   this.pieces.rotate(position);
  // }

  // rotateMousedown(id: string, position: number) {
  //   this.users.rotateMousedown(id, position);
  // }
}
