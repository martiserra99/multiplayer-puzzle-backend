import Piece from "./piece";

import PuzzlePiece from "./puzzle-piece";

import { JsonPuzzle, Position } from "../types";

import constants from "../constants";
import config from "../config";
import styles from "../styles";

export default class Puzzle {
  public puzzlePieces: PuzzlePiece[];

  constructor() {
    this.puzzlePieces = [];
  }

  get json(): JsonPuzzle {
    return this.puzzlePieces.map((puzzlePiece) => puzzlePiece.json);
  }

  insert(piece: Piece, coords: Position): boolean {
    const position = this.fromCoordsToPosition(coords);
    const inside = this.inside(position, piece);
    if (!inside) return false;
    const overlapping = this.overlapping(position, piece);
    if (overlapping) return false;
    this.puzzlePieces.push(new PuzzlePiece(piece, position));
    return true;
  }

  remove(id: number): Piece | undefined {
    const index = this.puzzlePieces.findIndex(({ piece }) => piece.id === id);
    if (index === -1) return;
    return this.puzzlePieces.splice(index, 1)[0].piece;
  }

  private fromCoordsToPosition(coords: Position): Position {
    const size = constants.puzzle.content.size.width / config.dimensions.x;
    const relativeX = coords.x - constants.puzzle.content.coords.x;
    const relativeY = coords.y - constants.puzzle.content.coords.y;
    const x = Math.floor(relativeX / size);
    const y = Math.floor(relativeY / size);
    return { x, y };
  }

  private inside(position: Position, piece: Piece): boolean {
    if (position.x < 0) return false;
    if (position.y < 0) return false;
    if (position.x + piece.numColumns > config.dimensions.x) return false;
    if (position.y + piece.numRows > config.dimensions.y) return false;
    return true;
  }

  private overlapping(position: Position, piece: Piece): boolean {
    for (const puzzlePiece of this.puzzlePieces)
      if (puzzlePiece.overlapping(position, piece)) return true;
    return false;
  }
}
