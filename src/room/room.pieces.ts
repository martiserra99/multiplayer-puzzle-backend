import { JsonPieces } from "../types";

import Piece from "./room.piece";

import createPieces from "../create-pieces";

import config from "../config";

export default class Pieces {
  private pieces: Piece[];

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

  get json(): JsonPieces {
    return this.pieces.map((piece) => piece.json);
  }
}
