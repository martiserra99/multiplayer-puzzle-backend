import { JsonPieces } from "../types";

import createPieces from "../create-pieces";

import config from "../config";

export default class Pieces {
  private json: JsonPieces;

  constructor() {
    const pieces = createPieces(
      config.dimensions.x,
      config.dimensions.y,
      config.pieces
    );
    this.json = pieces.map((piece, index) => ({
      position: index,
      piece,
    }));
  }

  set(json: JsonPieces) {
    this.json = json;
  }

  get(): JsonPieces {
    return this.json;
  }
}
