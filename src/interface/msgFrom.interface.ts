//Registration
export interface LoginUser {
  type: string;
  data: {
    name: string;
    password: string;
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

//
