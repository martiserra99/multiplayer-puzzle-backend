import Piece from "./piece";

import { Position } from "../types";

export default class SelectedPiece {
  public piece: Piece;
  public offset: Position;

  constructor(piece: Piece, offset: Position) {
    this.piece = piece;
    this.offset = offset;
  }

  get json() {
    return { piece: this.piece.json, offset: this.offset };
  }

  coords(position: Position): Position {
    return { x: 0, y: 0 };
  }
}
