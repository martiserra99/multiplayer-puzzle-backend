import Piece from "./piece";

import { JsonPuzzlePiece, Position } from "../types";

export default class PuzzlePiece {
  public piece: Piece;
  public position: Position;

  constructor(piece: Piece, position: Position) {
    this.piece = piece;
    this.position = position;
  }

  get json(): JsonPuzzlePiece {
    return { piece: this.piece.json, position: this.position };
  }

  public overlapping(position: Position, piece: Piece): boolean {
    const newPositions = piece.positions.map(({ x, y }) => ({
      x: position.x + x,
      y: position.y + y,
    }));
    const filledPositions = this.piece.positions.map(({ x, y }) => ({
      x: this.position.x + x,
      y: this.position.y + y,
    }));
    for (const newPosition of newPositions) {
      for (const filledPosition of filledPositions) {
        if (
          newPosition.x === filledPosition.x &&
          newPosition.y === filledPosition.y
        ) {
          return true;
        }
      }
    }
    return false;
  }
}
