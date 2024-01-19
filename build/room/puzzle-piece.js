"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class PuzzlePiece {
    constructor(piece, position) {
        this.piece = piece;
        this.position = position;
    }
    get json() {
        return { piece: this.piece.json, position: this.position };
    }
    overlapping(position, piece) {
        const newPositions = piece.positions.map(({ x, y }) => ({
            x: position.x + x,
            y: position.y + y,
        }));
        const filledPositions = this.piece.positions.map(({ x, y }) => ({
            x: this.position.x + x,
            y: this.position.y + y,
        }));
        for (const newPosition of newPositions) {
            for (const filledPosition of filledPositions) {
                if (newPosition.x === filledPosition.x &&
                    newPosition.y === filledPosition.y) {
                    return true;
                }
            }
        }
        return false;
    }
}
exports.default = PuzzlePiece;
