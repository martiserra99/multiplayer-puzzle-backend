import { JsonPieces } from "../types";

import Piece from "./piece";

import createPieces from "../create-pieces";

import config from "../config";

export default class Pieces {
  public pieces: Piece[];

  constructor() {
    const pieces: JsonPieces = createPieces(
      config.dimensions.x,
      config.dimensions.y,
      config.pieces
    );
    this.pieces = pieces.map(({ id, style, positions }) => {
      return new Piece(id, style, positions);
    });
  }

  [Symbol.iterator]() {
    return this.pieces[Symbol.iterator]();
  }

  get json(): JsonPieces {
    return this.pieces.map((piece) => piece.json);
  }

  rotate(position: number) {
    const piece = this.pieces.find((piece) => piece.id === position);
    if (piece) piece.rotate();
  }

  insert(piece: Piece) {
    this.pieces.push(piece);
  }

  remove(id: number): Piece | undefined {
    const index = this.pieces.findIndex((piece) => piece.id === id);
    if (index === -1) return;
    return this.pieces.splice(index, 1)[0];
  }
}
