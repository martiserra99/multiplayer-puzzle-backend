"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Piece {
    constructor(id, style, positions) {
        this.id = id;
        this.id = id;
        this.style = style;
        this.positions = positions;
    }
    get numColumns() {
        return this.positions.reduce((acc, { x }) => (acc < x ? x : acc), 0) + 1;
    }
    get numRows() {
        return this.positions.reduce((acc, { y }) => (acc < y ? y : acc), 0) + 1;
    }
    get json() {
        return {
            id: this.id,
            style: this.style,
            positions: this.positions,
        };
    }
    rotate() {
        const maxX = this.positions.reduce((acc, { x }) => (acc < x ? x : acc), 0);
        this.positions = this.positions.map(({ x, y }) => ({
            x: y,
            y: maxX - x,
        }));
    }
}
exports.default = Piece;
