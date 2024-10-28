import { WebSocket } from "ws";
//Registration
export interface LoginUser {
  type: string;
  data: {
    name: string;
    password: string;
    indexRoom?: number | string;
  };
  id: number;
}
export interface GetUserShips {
  type: string;
  data: {
    gameId: string | number;
    ships: Ship[];
    indexPlayer: string | number;
  };
  id: number;
}

export interface LoginUserAnswer {
  type: string;
  data: {
    name: string;
    index: number | string;
    error: boolean;
    errorText: string;
  };
  id: number;
}

export interface UserRoomInfo {
  name: string;
  index: number | string;
}

export interface User {
  id: string;
  ws: WebSocket;
  data?: LoginUser["data"];
  isPlaying: boolean;
}

export interface Ship {
  position: {
    x: number;
    y: number;
  };
  direction: boolean;
  length: number;
  type: "small" | "medium" | "large" | "huge";
}
