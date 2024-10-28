import { WebSocket } from "ws";
import { LoginUser, LoginUserAnswer } from "../interface/msgFrom.interface";

let counter = 0;

export const allUsersData = new Map<
  WebSocket,
  { ws: WebSocket; name?: string; password?: string }
>();

export function createUser(
  data: LoginUser["data"],
  ws: WebSocket
): LoginUserAnswer["data"] {
  const id = `${data.name}-${(counter += 1)}`;
  const dataToSave = {
    ws,
    name: data.name,
    password: data.password,
  };
  allUsersData.set(ws, dataToSave);
  console.log(`User ${id}, created`);
  return {
    name: dataToSave.name,
    index: id,
    error: false,
    errorText: "No error",
  };
}

export function showUsers() {
  allUsersData.forEach((user) => {
    console.log(user.name);
  });
}
