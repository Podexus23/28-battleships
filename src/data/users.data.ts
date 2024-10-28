import { WebSocket } from "ws";
import { LoginUser, LoginUserAnswer } from "../interface/msgFrom.interface";

let counter = 0;

export const allUsersData: {
  id: string;
  ws: WebSocket;
  data?: LoginUser["data"];
}[] = [];

export function createUser(ws: WebSocket) {
  const userModel = {
    id: `user-${(counter += 1)}`,
    ws,
  };
  console.log(`User ${userModel.id}, created`);
  allUsersData.push(userModel);
  return userModel.id;
}

export function updateUser(
  newData: LoginUser["data"],
  userId: string
): LoginUserAnswer["data"] | undefined {
  let user = allUsersData.find((user) => user.id === userId);
  try {
    if (!user) throw new Error("UpdateUser: unexpected error, no such user");
    user.data = {
      name: newData.name,
      password: newData.password,
    };
    return {
      name: user.data.name,
      index: user.id,
      error: false,
      errorText: "No error",
    };
  } catch (error) {
    if (error instanceof Error) console.error(error.message);
  }
}
