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

  rotate(position: number) {
    const piece = this.json.find((piece) => piece.id === position);
    if (!piece) return;
    const pos = piece.positions;
    const cols = pos.reduce((acc, pos) => (acc < pos.x ? pos.x : acc), 0) + 1;
    const maxX = cols - 1;
    const result = [];
    for (const { x, y } of pos) result.push({ x: y, y: maxX - x });
    piece.positions = result;
  }
}
