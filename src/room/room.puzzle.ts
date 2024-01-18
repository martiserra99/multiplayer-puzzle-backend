import { JsonPuzzle } from "../types";

export default class Puzzle {
  private json: JsonPuzzle;

  constructor() {
    this.json = [];
  }

  set(json: JsonPuzzle) {
    this.json = json;
  }

  get(): JsonPuzzle {
    return this.json;
  }
}
