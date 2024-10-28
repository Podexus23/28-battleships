export enum MessageSendType {
  //personal response
  Registration = "reg",
  //response for the game room
  CreateGame = "create_game",
  StartGame = "start_game",
  ChangeTurn = "turn",
  SendAttack = "attack",
  EndGame = "finnish",
  //response for all
  UpdateRoomsAndUsersData = "update_room",
  SendScoreTable = "update_winners",
}
export enum MessageGetType {
  //personal response
  Registration = "reg",
  //response for the game room
  CreateRoom = "create_room",
  AddUserToRoom = "add_user_to_room",
  AddShips = "add_ships",
  SendAttack = "attack",
  RandomAttack = "randomAttack",
}
