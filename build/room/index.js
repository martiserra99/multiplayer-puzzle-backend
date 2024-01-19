"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const users_1 = __importDefault(require("./users"));
const puzzle_1 = __importDefault(require("./puzzle"));
const pieces_1 = __importDefault(require("./pieces"));
const constants_1 = __importDefault(require("../constants"));
const styles_1 = __importDefault(require("../styles"));
class Room {
    constructor(id) {
        this.id = id;
        this.users = new users_1.default();
        this.puzzle = new puzzle_1.default();
        this.pieces = new pieces_1.default();
    }
    get json() {
        return {
            id: this.id,
            users: this.users.json,
            puzzle: this.puzzle.json,
            pieces: this.pieces.json,
        };
    }
    get numberUsers() {
        return this.users.length;
    }
    join(id) {
        this.users.join(id);
    }
    user(id) {
        return this.users.user(id);
    }
    leave(id) {
        this.users.leave(id);
    }
    move(user, coords) {
        user.move(coords);
    }
    mouseup(user, coords) {
        user.rotateBlur();
        const selected = user.removeSelectedPiece();
        if (selected) {
            const coordsPiece = this.coordsSelectedPiece(coords, selected);
            if (this.coordsInsidePuzzle(coordsPiece)) {
                const inserted = this.puzzle.insert(selected.piece, coordsPiece);
                if (inserted)
                    return;
            }
            this.pieces.insert(selected.piece);
        }
    }
    rotate(user, position) {
        if ([...this.users].some((u) => u.rotate === position && u !== user)) {
            return;
        }
        this.pieces.rotate(position);
    }
    rotateFocus(user, position) {
        if ([...this.users].some((u) => u.rotate === position && u !== user)) {
            return;
        }
        user.rotateFocus(position);
    }
    selectFromPieces(user, id, offset) {
        const selected = this.pieces.remove(id);
        if (selected)
            user.selectPiece(selected, offset);
    }
    selectFromPuzzle(user, id, offset) {
        const selected = this.puzzle.remove(id);
        if (selected)
            user.selectPiece(selected, offset);
    }
    coordsSelectedPiece(coords, selectedPiece) {
        const x = coords.x - selectedPiece.offset.x + styles_1.default.square.size / 2;
        const y = coords.y - selectedPiece.offset.y + styles_1.default.square.size / 2;
        return { x, y };
    }
    coordsInsidePuzzle(coords) {
        const content = constants_1.default.puzzle.content;
        return (coords.x >= content.coords.x &&
            coords.y >= content.coords.y &&
            coords.x <= content.coords.x + content.size.width &&
            coords.y <= content.coords.y + content.size.height);
    }
}
exports.default = Room;
