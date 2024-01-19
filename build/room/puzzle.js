"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const puzzle_piece_1 = __importDefault(require("./puzzle-piece"));
const constants_1 = __importDefault(require("../constants"));
const config_1 = __importDefault(require("../config"));
class Puzzle {
    constructor() {
        this.puzzlePieces = [];
    }
    get json() {
        return this.puzzlePieces.map((puzzlePiece) => puzzlePiece.json);
    }
    insert(piece, coords) {
        const position = this.fromCoordsToPosition(coords);
        const inside = this.inside(position, piece);
        if (!inside)
            return false;
        const overlapping = this.overlapping(position, piece);
        if (overlapping)
            return false;
        this.puzzlePieces.push(new puzzle_piece_1.default(piece, position));
        return true;
    }
    remove(id) {
        const index = this.puzzlePieces.findIndex(({ piece }) => piece.id === id);
        if (index === -1)
            return;
        return this.puzzlePieces.splice(index, 1)[0].piece;
    }
    fromCoordsToPosition(coords) {
        const size = constants_1.default.puzzle.content.size.width / config_1.default.dimensions.x;
        const relativeX = coords.x - constants_1.default.puzzle.content.coords.x;
        const relativeY = coords.y - constants_1.default.puzzle.content.coords.y;
        const x = Math.floor(relativeX / size);
        const y = Math.floor(relativeY / size);
        return { x, y };
    }
    inside(position, piece) {
        if (position.x < 0)
            return false;
        if (position.y < 0)
            return false;
        if (position.x + piece.numColumns > config_1.default.dimensions.x)
            return false;
        if (position.y + piece.numRows > config_1.default.dimensions.y)
            return false;
        return true;
    }
    overlapping(position, piece) {
        for (const puzzlePiece of this.puzzlePieces)
            if (puzzlePiece.overlapping(position, piece))
                return true;
        return false;
    }
}
exports.default = Puzzle;
