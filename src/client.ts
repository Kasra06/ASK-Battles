import { FirebaseApp } from "./firebase";
//@ts-ignore import module
import { v4 as uuid4 } from "https://cdn.skypack.dev/pin/uuid@v9.0.1-Qyvn3A5kWlDfdUqj1DBN/mode=imports/optimized/uuid.js";

class Client {
  private firebase: FirebaseApp;
  private players: string[] = [];
  private _uuid: string;
  constructor(firebase: FirebaseApp, roomId: null | string = null) {
    this.firebase = firebase;
    this._uuid = roomId ? roomId : uuid4();
  }

  public nOfPlayers(): number {
    return this.players.length;
  }

  public get uid() {
    return this._uuid;
  }
}

export { Client };
