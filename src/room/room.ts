import { JsonRoom } from "../types";

import Puzzle from "./room.puzzle";
import Pieces from "./room.pieces";

export class Room {
  private puzzle: Puzzle;
  private pieces: Pieces;

  constructor(public id: string) {
    this.puzzle = new Puzzle();
    this.pieces = new Pieces();
  }

  set(json: JsonRoom) {
    this.puzzle.set(json.puzzle);
    this.pieces.set(json.pieces);
  }

  get(): JsonRoom {
    return {
      id: this.id,
      users: [],
      puzzle: this.puzzle.get(),
      pieces: this.pieces.get(),
    };
  }

  rotate(position: number) {
    this.pieces.rotate(position);
  }
}
