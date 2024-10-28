import { stringifyMessage } from "../helpers/message.helpers";
import { LoginUserAnswer } from "../interface/msgFrom.interface";
import { MessageSendType } from "../interface/types.interface";
import { WebSocket } from "ws";
import { getUser } from "./users.data";
import { getRoom } from "./rooms.data";

export function sendRegData(
  userData: LoginUserAnswer["data"],
  socket: WebSocket
) {
  const dataToReg = {
    type: MessageSendType.Registration,
    data: "",
    id: 0,
  };

  const dataToSend = stringifyMessage(userData, dataToReg);
  if (dataToSend) socket.send(dataToSend);
}

export function addUserToRoom(roomId: string, playerId: string) {
  const user = getUser(playerId);
  const room = getRoom(roomId);
  if (user && room && user.data) {
    room.roomUsers.push({ name: `${user.data.name}`, index: user.id });
  }
}
