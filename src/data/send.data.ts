import { stringifyMessage } from "../helpers/message.helpers";
import { LoginUserAnswer } from "../interface/msgFrom.interface";
import { MessageSendType } from "../interface/types.interface";
import { WebSocket } from "ws";

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
