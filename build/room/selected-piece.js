"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SelectedPiece {
    constructor(piece, offset) {
        this.piece = piece;
        this.offset = offset;
    }
    get json() {
        return { piece: this.piece.json, offset: this.offset };
    }
}
exports.default = SelectedPiece;
