export interface Room {
  id: string;
  users: {
    [key: string]: { x: number; y: number }[];
  };
}
