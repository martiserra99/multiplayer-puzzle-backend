import { JsonPiece, Position } from "../types";

export default class Piece {
  public style: number;
  public positions: Position[];

  constructor(public id: number, style: number, positions: Position[]) {
    this.id = id;
    this.style = style;
    this.positions = positions;
  }

  get numColumns(): number {
    return this.positions.reduce((acc, { x }) => (acc < x ? x : acc), 0) + 1;
  }

  get numRows(): number {
    return this.positions.reduce((acc, { y }) => (acc < y ? y : acc), 0) + 1;
  }

  get json(): JsonPiece {
    return {
      id: this.id,
      style: this.style,
      positions: this.positions,
    };
  }

  rotate(): void {
    const maxX = this.positions.reduce((acc, { x }) => (acc < x ? x : acc), 0);
    this.positions = this.positions.map(({ x, y }) => ({
      x: y,
      y: maxX - x,
    }));
  }
}
