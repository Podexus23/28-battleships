export function buildField(gameUserData) {
  let data = {
    gameId: "game-1",
    ships: [
      { position: { x: 0, y: 0 }, direction: false, type: "huge", length: 4 },
      { position: { x: 1, y: 8 }, direction: false, type: "large", length: 3 },
      { position: { x: 6, y: 7 }, direction: false, type: "large", length: 3 },
      { position: { x: 8, y: 2 }, direction: true, type: "medium", length: 2 },
      { position: { x: 0, y: 2 }, direction: false, type: "medium", length: 2 },
      { position: { x: 4, y: 2 }, direction: false, type: "medium", length: 2 },
      { position: { x: 8, y: 9 }, direction: false, type: "small", length: 1 },
      { position: { x: 4, y: 4 }, direction: false, type: "small", length: 1 },
      { position: { x: 8, y: 0 }, direction: false, type: "small", length: 1 },
      { position: { x: 2, y: 4 }, direction: true, type: "small", length: 1 },
    ],
    indexPlayer: "user-1",
  };

  const field = new Array(10).map((elem) => new Array(10).fill(0));
  console.log(field);
}
