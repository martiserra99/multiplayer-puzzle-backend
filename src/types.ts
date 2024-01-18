export type JsonRoom = {
  id: string;
  users: {
    id: string;
    coords: Position;
    selected: { piece: JsonPiece; offset: Position } | null;
  }[];
  puzzle: JsonPuzzle;
  pieces: JsonPieces;
};

export type JsonPuzzle = {
  position: Position;
  piece: JsonPiece;
}[];

export type JsonPieces = {
  position: Position;
  piece: JsonPiece;
}[];

export type JsonPiece = {
  id: number;
  style: number;
  positions: Position[];
};

export type Position = {
  x: number;
  y: number;
};
