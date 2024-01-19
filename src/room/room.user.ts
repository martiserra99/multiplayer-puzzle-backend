import Piece from "./room.piece";

import { JsonUser, Position } from "../types";

export default class User {
  private style: number;
  private coords: Position;
  private rotate: number;
  private selected: { piece: Piece; offset: Position } | null;

  constructor(public id: string) {
    this.id = id;
    this.style = 0;
    this.coords = { x: -100000, y: -100000 };
    this.rotate = -1;
    this.selected = null;
  }

  get json(): JsonUser {
    return {
      id: this.id,
      style: this.style,
      coords: this.coords,
      rotate: this.rotate,
      selected: this.selected
        ? { piece: this.selected.piece.json, offset: this.selected.offset }
        : null,
    };
  }

  move(coords: Position) {
    this.coords = coords;
  }

  // mouseup(id: string) {
  //   const user = this.json.find((user) => user.id === id);
  //   if (!user) return;
  //   user.rotate = -1;
  // }

  // rotateMousedown(id: string, position: number) {
  //   const user = this.json.find((user) => user.id === id);
  //   if (!user) return;
  //   const some = this.json.some((user) => user.rotate === position);
  //   if (some) return;
  //   user.rotate = position;
  // }
}
