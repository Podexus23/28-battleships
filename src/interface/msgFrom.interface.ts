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
