import Piece from "./piece";

import { JsonUser, Position } from "../types";

const random = (max: number) => Math.floor(Math.random() * max);

export default class User {
  public style: number;
  public coords: Position;
  public rotate: number;
  public selected: { piece: Piece; offset: Position } | null;

  constructor(public id: string) {
    this.id = id;
    this.style = random(10);
    this.coords = { x: -100000, y: -100000 };
    this.rotate = -1;
    this.selected = null;
  }

  get json(): JsonUser {
    return {
      id: this.id,
      style: this.style,
      coords: this.coords,
      rotate: this.rotate,
      selected: this.selected
        ? { piece: this.selected.piece.json, offset: this.selected.offset }
        : null,
    };
  }

  move(coords: Position) {
    this.coords = coords;
  }

  rotateFocus(position: number) {
    this.rotate = position;
  }

  rotateBlur() {
    this.rotate = -1;
  }

  selectPiece(piece: Piece, offset: Position) {
    this.selected = { piece, offset };
  }

  removeSelectedPiece(): { piece: Piece; offset: Position } | null {
    const selected = this.selected;
    this.selected = null;
    return selected;
  }
}
