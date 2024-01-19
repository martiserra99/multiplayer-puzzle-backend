import Piece from "./piece";
import SelectedPiece from "./selected-piece";

import { JsonUser, Position } from "../types";

const random = (max: number) => Math.floor(Math.random() * max);

export default class User {
  public style: number;
  public coords: Position;
  public rotate: number;
  public selectedPiece: SelectedPiece | null;

  constructor(public id: string) {
    this.id = id;
    this.style = random(10);
    this.coords = { x: -100000, y: -100000 };
    this.rotate = -1;
    this.selectedPiece = null;
  }

  get json(): JsonUser {
    return {
      id: this.id,
      style: this.style,
      coords: this.coords,
      rotate: this.rotate,
      selected: this.selectedPiece ? this.selectedPiece.json : null,
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
    this.selectedPiece = new SelectedPiece(piece, offset);
  }

  removeSelectedPiece(): SelectedPiece | null {
    const selected = this.selectedPiece;
    this.selectedPiece = null;
    return selected;
  }
}
