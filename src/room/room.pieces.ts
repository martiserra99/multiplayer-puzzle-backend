import { JsonPieces } from "../types";

export default class Pieces {
  private json: JsonPieces;

  constructor() {
    this.json = [];
  }

  set(json: JsonPieces) {
    this.json = json;
  }

  get(): JsonPieces {
    return this.json;
  }
}
