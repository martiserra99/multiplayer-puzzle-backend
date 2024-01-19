"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const piece_1 = __importDefault(require("./piece"));
const create_pieces_1 = __importDefault(require("../create-pieces"));
const config_1 = __importDefault(require("../config"));
class Pieces {
    constructor() {
        const pieces = (0, create_pieces_1.default)(config_1.default.dimensions.x, config_1.default.dimensions.y, config_1.default.pieces);
        this.pieces = pieces.map(({ id, style, positions }) => {
            return new piece_1.default(id, style, positions);
        });
    }
    [Symbol.iterator]() {
        return this.pieces[Symbol.iterator]();
    }
    get json() {
        return this.pieces.map((piece) => piece.json);
    }
    rotate(position) {
        const piece = this.pieces.find((piece) => piece.id === position);
        if (piece)
            piece.rotate();
    }
    insert(piece) {
        this.pieces.push(piece);
    }
    remove(id) {
        const index = this.pieces.findIndex((piece) => piece.id === id);
        if (index === -1)
            return;
        return this.pieces.splice(index, 1)[0];
    }
}
exports.default = Pieces;
