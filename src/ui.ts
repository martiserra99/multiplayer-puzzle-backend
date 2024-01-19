import config from "./config";
import styles from "./styles";

const ui = {
  puzzle: {
    size: { width: getPuzzleWidth(), height: getPuzzleHeight() },
    coords: { x: getX(), y: getY() },
  },
};

function getPuzzleWidth() {
  return (
    config.dimensions.x * styles.square.size +
    styles.square.margin * (config.dimensions.x - 1) +
    styles.square.border.size * 2
  );
}

function getPuzzleHeight() {
  return (
    config.dimensions.y * styles.square.size +
    styles.square.margin * (config.dimensions.y - 1) +
    styles.square.border.size * 2
  );
}

function getX() {
  return -getPuzzleWidth() / 2;
}

function getY() {
  const height = getPuzzleHeight();
  const margin = styles.puzzle.margin;
  const numberRows = Math.floor((config.pieces - 1) / 4) + 1;
  const gridPieces =
    (height + styles.rotate.margin + styles.rotate.height) * numberRows +
    styles.pieces.gap * (numberRows - 1);
  return -(height + margin + gridPieces + 56) / 2;
}

export default ui;
