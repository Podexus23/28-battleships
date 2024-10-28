import { httpServer } from "./http_server/index";
import { parseMessage, stringifyMessage } from "./helpers/message.helpers";
import { MessageGetType, MessageSendType } from "./interface/types.interface";
import { createUser, sendAllUserData, updateUser } from "./data/users.data";
import { RawData, WebSocketServer, WebSocket } from "ws";
import { createRoom, sendRooms } from "./data/rooms.data";
import { addUserToRoom, sendRegData } from "./data/send.data";
import { addShips, createGame } from "./data/games.data";

const HTTP_PORT = 8181;
const WS_PORT = 3000;

const wss = new WebSocketServer({ port: WS_PORT });
console.log(`WebSocketServer is open on port: ${WS_PORT}`);

httpServer.listen(HTTP_PORT);
console.log(`Start static http server on the ${HTTP_PORT} port!`);

wss.on("connection", (ws) => {
  console.log(`connected`);
  let userID = createUser(ws);

  ws.on("message", (message: RawData) => {
    const msgData = parseMessage(message);

    if (msgData?.type === MessageSendType.Registration && msgData.data) {
      console.log(`${userID} send message`);
      const userData = updateUser(msgData.data, userID);
      if (userData) sendRegData(userData, ws);
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
      let roomIndex = createRoom() as string;
      addUserToRoom(roomIndex as string, userID);
      const dataToSend = {
        type: MessageSendType.UpdateRoomsAndUsersData,
        data: JSON.stringify(sendRooms()),
        id: 0,
      };

      const allUsers = sendAllUserData();
      allUsers.forEach((user) => user.ws.send(JSON.stringify(dataToSend)));
    }
    if (msgData?.type === MessageGetType.AddUserToRoom) {
      if (msgData.data.indexRoom) {
        addUserToRoom(msgData.data.indexRoom as string, userID);
        createGame(msgData.data.indexRoom as string);
      }
    }
    if (msgData?.type === MessageGetType.AddShips) {
      addShips(JSON.stringify(msgData.data));
    }
  });
});
