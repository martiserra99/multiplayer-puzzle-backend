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

  mouseup(user: User): void {
    user.mouseup();
  }

  rotate(user: User, position: number) {
    if (this.users.json.some((i) => i.rotate === position && i !== user)) {
      return;
    }
    this.pieces.rotate(position);
  }

  rotateFocus(user: User, position: number) {
    if (this.users.json.some((i) => i.rotate === position && i !== user)) {
      return;
    }
    user.rotateFocus(position);
  }

  selectFromPieces(user: User, id: number, offset: Position): void {
    const piece = this.pieces.remove(id);
    if (piece) user.selectPiece(piece, offset);
  }
}
