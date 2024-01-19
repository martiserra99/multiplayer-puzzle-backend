"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(x, y, numberPieces) {
    const pieces = createPieces(x, y, numberPieces);
    const styles = createStyles(numberPieces);
    return pieces.map((piece, index) => ({
        id: index,
        positions: piece,
        style: styles[index],
    }));
}
exports.default = default_1;
function createPieces(x, y, numberPieces) {
    const matrix = createMatrix(x, y, numberPieces);
    return matrixPieces(matrix, numberPieces);
}
function createStyles(numberPieces) {
    const styles = [];
    const available = new Array(numberPieces).fill(0).map((_, i) => i);
    for (let i = 0; i < numberPieces; i++) {
        const index = Math.floor(Math.random() * available.length);
        const value = available.splice(index, 1)[0];
        styles.push(value);
    }
    return styles;
}
function createMatrix(x, y, numberPieces) {
    const matrix = newMatrix(x, y);
    while (hasMatrixValue(matrix, 0)) {
        insertMatrixValue(matrix, numberPieces);
        if (!hasMatrixValue(matrix, 0) && !isMatrixValid(matrix, numberPieces))
            fillMatrix(matrix, 0);
    }
    return matrix;
}
function newMatrix(x, y) {
    const matrix = [];
    for (let i = 0; i < y; i++) {
        matrix.push([]);
        for (let j = 0; j < x; j++)
            matrix[i].push(0);
    }
    return matrix;
}
function hasMatrixValue(matrix, value) {
    for (const y of matrix)
        if (y.includes(value))
            return true;
    return false;
}
function insertMatrixValue(matrix, numberPieces) {
    let inserted = false;
    const emptyPositions = matrixValuePositions(matrix, 0);
    while (!inserted) {
        const value = randomNumber(1, numberPieces);
        const position = randomFromArray(emptyPositions);
        if (canInsertMatrix(matrix, value, position)) {
            matrix[position.y][position.x] = value;
            inserted = true;
        }
    }
}
function matrixValuePositions(matrix, value) {
    const positions = [];
    for (let y = 0; y < matrix.length; y++)
        for (let x = 0; x < matrix[y].length; x++)
            if (matrix[y][x] === value)
                positions.push({ x, y });
    return positions;
}
function canInsertMatrix(matrix, value, { x, y }) {
    if (matrix[y][x] !== 0)
        return false;
    const positions = matrixValuePositions(matrix, value);
    if (positions.length === 0)
        return true;
    if (x > 0 && matrix[y][x - 1] === value)
        return true;
    if (y > 0 && matrix[y - 1][x] === value)
        return true;
    if (x < matrix[0].length - 1 && matrix[y][x + 1] === value)
        return true;
    if (y < matrix.length - 1 && matrix[y + 1][x] === value)
        return true;
    return false;
}
function isMatrixValid(matrix, numberPieces) {
    if (hasMatrixValue(matrix, 0))
        return false;
    const numberPositions = matrix.length * matrix[0].length;
    let meanNumPiecePositions = numberPositions / numberPieces;
    if (meanNumPiecePositions % 2 !== 0)
        meanNumPiecePositions += 1;
    const min = meanNumPiecePositions - meanNumPiecePositions / 2;
    const max = meanNumPiecePositions + meanNumPiecePositions / 2;
    for (let i = 0; i < numberPieces; i++) {
        const positions = matrixValuePositions(matrix, i + 1).length;
        if (positions < min || positions > max)
            return false;
    }
    return true;
}
function fillMatrix(matrix, value) {
    for (let y = 0; y < matrix.length; y++)
        for (let x = 0; x < matrix[y].length; x++)
            matrix[y][x] = value;
}
function matrixPieces(matrix, numberPieces) {
    const pieces = [];
    for (let i = 0; i < numberPieces; i++) {
        const piece = matrixPiece(matrix, i + 1);
        const rotated = rotatePiece(piece, randomNumber(0, 3));
        pieces.push(rotated);
    }
    return pieces;
}
function matrixPiece(matrix, value) {
    const positions = [];
    const substract = { x: -1, y: -1 };
    const positionsInMatrix = [];
    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
            if (matrix[y][x] !== value)
                continue;
            if (substract.y === -1 || y < substract.y)
                substract.y = y;
            if (substract.x === -1 || x < substract.x)
                substract.x = x;
            positionsInMatrix.push({ x, y });
        }
    }
    for (const { x, y } of positionsInMatrix) {
        positions.push({ x: x - substract.x, y: y - substract.y });
    }
    return positions;
}
function rotatePiece(piece, count) {
    let rotated = [...piece];
    for (let i = 0; i < count; i++) {
        const result = [];
        const maxX = rotated.reduce((acc, pos) => (acc < pos.x ? pos.x : acc), 0);
        for (const { x, y } of rotated)
            result.push({ x: y, y: maxX - x });
        rotated = result;
    }
    return rotated;
}
function randomFromArray(array) {
    return array[randomNumber(0, array.length - 1)];
}
function randomNumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}
