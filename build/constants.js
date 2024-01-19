"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = __importDefault(require("./config"));
const styles_1 = __importDefault(require("./styles"));
const constants = {
    puzzle: {
        size: puzzleSize(),
        coords: puzzleCoords(),
        content: {
            size: puzzleContentSize(),
            coords: puzzleContentCoords(),
        },
    },
};
function puzzleSize() {
    return { width: puzzleWidth(), height: puzzleHeight() };
}
function puzzleWidth() {
    return (config_1.default.dimensions.x * styles_1.default.square.size +
        styles_1.default.square.margin * (config_1.default.dimensions.x - 1) +
        styles_1.default.square.border.size * 2);
}
function puzzleHeight() {
    return (config_1.default.dimensions.y * styles_1.default.square.size +
        styles_1.default.square.margin * (config_1.default.dimensions.y - 1) +
        styles_1.default.square.border.size * 2);
}
function puzzleCoords() {
    return { x: puzzleX(), y: puzzleY() };
}
function puzzleX() {
    return -puzzleWidth() / 2;
}
function puzzleY() {
    const height = puzzleHeight();
    const margin = styles_1.default.puzzle.margin;
    const numberRows = Math.floor((config_1.default.pieces - 1) / 4) + 1;
    const gridPieces = (height + styles_1.default.rotate.margin + styles_1.default.rotate.height) * numberRows +
        styles_1.default.pieces.gap * (numberRows - 1);
    return -(height + margin + gridPieces + 56) / 2;
}
function puzzleContentCoords() {
    return { x: puzzleContentX(), y: puzzleContentY() };
}
function puzzleContentX() {
    return puzzleX() + styles_1.default.square.border.size;
}
function puzzleContentY() {
    return puzzleY() + styles_1.default.square.border.size;
}
function puzzleContentSize() {
    return { width: puzzleContentWidth(), height: puzzleContentHeight() };
}
function puzzleContentWidth() {
    return puzzleWidth() - styles_1.default.square.border.size * 2;
}
function puzzleContentHeight() {
    return puzzleHeight() - styles_1.default.square.border.size * 2;
}
exports.default = constants;
