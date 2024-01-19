import { JsonRoom, Position } from "../types";

import Users from "./users";
import Puzzle from "./puzzle";
import Pieces from "./pieces";
import User from "./user";
import SelectedPiece from "./selected-piece";

import constants from "../constants";
import styles from "../styles";

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

  mouseup(user: User, coords: Position): void {
    user.rotateBlur();
    const selected = user.removeSelectedPiece();
    if (selected) {
      const coordsPiece = this.coordsSelectedPiece(coords, selected);
      if (this.coordsInsidePuzzle(coordsPiece)) {
        const inserted = this.puzzle.insert(selected.piece, coordsPiece);
        if (inserted) return;
      }
      this.pieces.insert(selected.piece);
    }
  }

  rotate(user: User, position: number) {
    if ([...this.users].some((u) => u.rotate === position && u !== user)) {
      return;
    }
    this.pieces.rotate(position);
  }

  rotateFocus(user: User, position: number) {
    if ([...this.users].some((u) => u.rotate === position && u !== user)) {
      return;
    }
    user.rotateFocus(position);
  }

  selectFromPieces(user: User, id: number, offset: Position): void {
    const selected = this.pieces.remove(id);
    if (selected) user.selectPiece(selected, offset);
  }

  selectFromPuzzle(user: User, id: number, offset: Position): void {
    const selected = this.puzzle.remove(id);
    if (selected) user.selectPiece(selected, offset);
  }

  private coordsSelectedPiece(coords: Position, selectedPiece: SelectedPiece) {
    const x = coords.x - selectedPiece.offset.x + styles.square.size / 2;
    const y = coords.y - selectedPiece.offset.y + styles.square.size / 2;
    return { x, y };
  }

  private coordsInsidePuzzle(coords: Position): boolean {
    const content = constants.puzzle.content;
    return (
      coords.x >= content.coords.x &&
      coords.y >= content.coords.y &&
      coords.x <= content.coords.x + content.size.width &&
      coords.y <= content.coords.y + content.size.height
    );
  }
}
