import { JsonPiece, Position } from "../types";

export default class Piece {
  private style: number;
  private positions: Position[];

  constructor(public id: number, style: number, positions: Position[]) {
    this.id = id;
    this.style = style;
    this.positions = positions;
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
