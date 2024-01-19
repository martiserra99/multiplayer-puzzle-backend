import config from "./config";
import styles from "./styles";

type Constants = {
  puzzle: {
    size: { width: number; height: number };
    coords: { x: number; y: number };
    content: {
      size: { width: number; height: number };
      coords: { x: number; y: number };
    };
  };
};

const constants: Constants = {
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
  return (
    config.dimensions.x * styles.square.size +
    styles.square.margin * (config.dimensions.x - 1) +
    styles.square.border.size * 2
  );
}

function puzzleHeight() {
  return (
    config.dimensions.y * styles.square.size +
    styles.square.margin * (config.dimensions.y - 1) +
    styles.square.border.size * 2
  );
}

function puzzleCoords() {
  return { x: puzzleX(), y: puzzleY() };
}

function puzzleX() {
  return -puzzleWidth() / 2;
}

function puzzleY() {
  const height = puzzleHeight();
  const margin = styles.puzzle.margin;
  const numberRows = Math.floor((config.pieces - 1) / 4) + 1;
  const gridPieces =
    (height + styles.rotate.margin + styles.rotate.height) * numberRows +
    styles.pieces.gap * (numberRows - 1);
  return -(height + margin + gridPieces + 56) / 2;
}

function puzzleContentCoords() {
  return { x: puzzleContentX(), y: puzzleContentY() };
}

function puzzleContentX() {
  return puzzleX() + styles.square.border.size;
}

function puzzleContentY() {
  return puzzleY() + styles.square.border.size;
}

function puzzleContentSize() {
  return { width: puzzleContentWidth(), height: puzzleContentHeight() };
}

function puzzleContentWidth() {
  return puzzleWidth() - styles.square.border.size * 2;
}

function puzzleContentHeight() {
  return puzzleHeight() - styles.square.border.size * 2;
}

export default constants;
