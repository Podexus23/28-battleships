let counter = 0;

export const allRoomsData: {
  roomId: string | number;
  roomUsers: ({ name: string; index: number | string } | undefined)[];
}[] = [];

export function createRoom() {
  const roomId = `room-${(counter += 1)}`;
  const dataToSave = {
    roomId,
    roomUsers: [] as ({ name: string; index: number | string } | undefined)[],
  };
  allRoomsData.push(dataToSave);
  console.log(`Room ${roomId}, created`);
}

export function sendRooms() {
  return allRoomsData.filter(({ roomId, roomUsers }) => {
    if (roomUsers.length < 2) return { roomId, roomUsers };
  });
}

export function addUserToRoom() {}
