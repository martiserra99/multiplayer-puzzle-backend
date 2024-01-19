import Piece from "./piece";
import SelectedPiece from "./selected-piece";

import { JsonUser, Position } from "../types";

const random = (max: number) => Math.floor(Math.random() * max);

const SQUARE_SIZE = 20;

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
      selectedPiece: this.selectedPiece ? this.selectedPiece.json : null,
    };
  }

  get selectedPieceCoords(): Position {
    if (!this.selectedPiece) throw new Error("No selected piece");
    const x = this.coords.x - this.selectedPiece.offset.x + SQUARE_SIZE / 2;
    const y = this.coords.y - this.selectedPiece.offset.y + SQUARE_SIZE / 2;
    return { x, y };
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
