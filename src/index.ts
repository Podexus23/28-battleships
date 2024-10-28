import { httpServer } from "./http_server/index";
import { parseMessage, stringifyMessage } from "./helpers/message.helpers";
import { MessageGetType, MessageSendType } from "./interface/types.interface";
import { LoginUser } from "./interface/msgFrom.interface";
import { createUser } from "./data/users.data";
import { RawData, WebSocketServer, WebSocket } from "ws";
import { createRoom, sendRooms } from "./data/rooms.data";

const HTTP_PORT = 8181;
const WS_PORT = 3000;

function sendRegData(data: LoginUser["data"], socket: WebSocket) {
  const user = createUser(data, socket);

  const dataToReg = {
    type: MessageSendType.Registration,
    data: "",
    id: 0,
  };

  const dataToSend = stringifyMessage(user, dataToReg);
  if (dataToSend) socket.send(dataToSend);
}

//open room?
const wss = new WebSocketServer({ port: WS_PORT });
httpServer.listen(HTTP_PORT);
console.log(`Start static http server on the ${HTTP_PORT} port!`);

wss.on("connection", (ws) => {
  console.log(`connected`);

  ws.on("message", (message: RawData) => {
    const msgData = parseMessage(message);

    if (msgData?.type === "reg" && msgData.data) {
      sendRegData(msgData.data, ws);
      ws.send(
        JSON.stringify({
          type: MessageSendType.UpdateRoomsAndUsersData,
          data: JSON.stringify(sendRooms()),
          id: 0,
        })
      );
      ws.send(
        JSON.stringify({
          type: MessageSendType.SendScoreTable,
          data: JSON.stringify([]),
          id: 0,
        })
      );
    }
    if (msgData?.type === MessageGetType.CreateRoom) {
      createRoom();
      const dataToSend = {
        type: MessageSendType.UpdateRoomsAndUsersData,
        data: JSON.stringify(sendRooms()),
        id: 0,
      };

      ws.send(JSON.stringify(dataToSend));
    }
    if (msgData?.type === MessageGetType.AddUserToRoom) {
      createRoom();
      const dataToSend = {
        type: MessageSendType.UpdateRoomsAndUsersData,
        data: JSON.stringify(sendRooms()),
        id: 0,
      };

      ws.send(JSON.stringify(dataToSend));
    }
  });
});
