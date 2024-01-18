import { FirebaseApp } from "./firebase";
// import { v4 } from "uuid";

class Client {
  private firebase: FirebaseApp;
  private players: string[] = [];
  private _uuid: string;
  constructor(firebase: FirebaseApp, playerId: string) {
    this.firebase = firebase;
    this.players[0] = playerId;
    this._uuid = "213";
  }

  public nOfPlayers(): number {
    return this.players.length;
  }

  public get uuid() {
    return this._uuid;
  }
}

export { Client };
