import { GetUserShips, Ship, User } from "../interface/msgFrom.interface";
import { MessageSendType } from "../interface/types.interface";
import { getRoom } from "./rooms.data";
import { getUser } from "./users.data";

let counter = 0;

interface Game {
  idGame: string | number;
  players: {
    [player: string]: {
      id: string;
      ships: Ship[];
    };
  };
  isReady: number;
}

const allGamesData: Game[] = [];

export function createGame(roomId: string) {
  const room = getRoom(roomId);

  if (!room) return;
  if (room.roomUsers.length === 2) {
    let player1 = getUser(room.roomUsers[0]?.index as string);
    let player2 = getUser(room.roomUsers[1]?.index as string);
    let idGame = `game-${(counter += 1)}`;
    const game = {
      idGame,
      players: {
        [player1?.id as string]: {
          id: player1?.id as string,
          ships: [],
        },
        [player2?.id as string]: {
          id: player2?.id as string,
          ships: [],
        },
      },
      isReady: 0,
    };
    allGamesData.push(game);
    const dataToSend1 = {
      type: MessageSendType.CreateGame,
      data: JSON.stringify({ idGame, idPlayer: player1?.id }),
      id: 0,
    };
    const dataToSend2 = {
      type: MessageSendType.CreateGame,
      data: JSON.stringify({ idGame, idPlayer: player2?.id }),
      id: 0,
    };
    player1?.ws.send(JSON.stringify(dataToSend1));
    player2?.ws.send(JSON.stringify(dataToSend2));
  }
}

export function startGame(game: Game) {
  if (!game) return;
  let players = Object.keys(game.players);
  let player1 = getUser(players[0]);
  let player2 = getUser(players[1]);

  const dataToSend1 = {
    type: MessageSendType.StartGame,
    data: JSON.stringify({
      ships: game.players[player1?.id as string].ships,
      currentPlayerIndex: player1?.id,
    }),
    id: 0,
  };
  const dataToSend2 = {
    type: MessageSendType.StartGame,
    data: JSON.stringify({
      ships: game.players[player2?.id as string].ships,
      currentPlayerIndex: player2?.id,
    }),
    id: 0,
  };
  player1?.ws.send(JSON.stringify(dataToSend1));
  player2?.ws.send(JSON.stringify(dataToSend2));
}

export function addShips(data: string) {
  const playerData: GetUserShips["data"] = JSON.parse(data);
  console.log(`fresh data`, playerData);

  const game = allGamesData.find((game) => game.idGame === playerData.gameId);
  if (!game) return;
  const player = game.players[playerData.indexPlayer];
  player.ships = playerData.ships;
  game.isReady += 1;
  if (game.isReady === 2) startGame(game);
  console.log(`Ships added for player ${player.id}`);
}
