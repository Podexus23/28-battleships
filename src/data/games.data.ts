import { MessageSendType } from "../interface/types.interface";
import { getRoom } from "./rooms.data";
import { getUser } from "./users.data";

let counter = 0;

interface Game {
  idGame: string | number;
}

const allGamesData: Game[] = [];

export function createGame(roomId: string) {
  const room = getRoom(roomId);

  if (!room) return;
  if (room.roomUsers.length === 2) {
    let player1 = getUser(room.roomUsers[0]?.index as string);
    let player2 = getUser(room.roomUsers[1]?.index as string);
    let idGame = `game-${(counter += 1)}`;
    const dataToSend1 = {
      type: MessageSendType.StartGame,
      data: JSON.stringify({ idGame, idPlayer: player1?.id }),
      id: 0,
    };
    const dataToSend2 = {
      type: MessageSendType.StartGame,
      data: JSON.stringify({ idGame, idPlayer: player2?.id }),
      id: 0,
    };
    player1?.ws.send(JSON.stringify(dataToSend1));
    player2?.ws.send(JSON.stringify(dataToSend2));
  }
}
