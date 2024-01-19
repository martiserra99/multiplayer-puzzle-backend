"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const selected_piece_1 = __importDefault(require("./selected-piece"));
const random = (max) => Math.floor(Math.random() * max);
class User {
    constructor(id) {
        this.id = id;
        this.id = id;
        this.style = random(10);
        this.coords = { x: -100000, y: -100000 };
        this.rotate = -1;
        this.selectedPiece = null;
    }
    get json() {
        return {
            id: this.id,
            style: this.style,
            coords: this.coords,
            rotate: this.rotate,
            selectedPiece: this.selectedPiece ? this.selectedPiece.json : null,
        };
    }
    move(coords) {
        this.coords = coords;
    }
    rotateFocus(position) {
        this.rotate = position;
    }
    rotateBlur() {
        this.rotate = -1;
    }
    selectPiece(piece, offset) {
        this.selectedPiece = new selected_piece_1.default(piece, offset);
    }
    removeSelectedPiece() {
        const selected = this.selectedPiece;
        this.selectedPiece = null;
        return selected;
    }
}
exports.default = User;
