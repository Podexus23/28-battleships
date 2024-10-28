import { UserRoomInfo } from "../interface/msgFrom.interface";

let counter = 0;

interface Room {
  roomId: string | number;
  roomUsers: ({ name: string; index: number | string } | undefined)[];
}

const allRoomsData: Room[] = [];

export function createRoom(): Room["roomId"] {
  const roomId = `room-${(counter += 1)}`;
  const dataToSave = {
    roomId,
    roomUsers: [] as (UserRoomInfo | undefined)[],
  };
  allRoomsData.push(dataToSave);
  console.log(`Room ${roomId}, created`);
  return roomId;
}

export function sendRooms() {
  return allRoomsData.filter(({ roomId, roomUsers }) => {
    if (roomUsers.length < 2) return { roomId, roomUsers };
  });
}

export function getRoom(roomId: string): Room | undefined {
  return allRoomsData.find((room) => room.roomId === roomId);
}
