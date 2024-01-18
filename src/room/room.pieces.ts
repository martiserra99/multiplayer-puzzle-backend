import { JsonPieces } from "../types";

import createPieces from "../create-pieces";

import config from "../config";

export default class Pieces {
  private json: JsonPieces;

  constructor() {
    this.json = createPieces(
      config.dimensions.x,
      config.dimensions.y,
      config.pieces
    );
  }

  set(json: JsonPieces) {
    this.json = json;
  }

  get(): JsonPieces {
    return this.json;
  }
}
