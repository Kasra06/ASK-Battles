import { v4 as uuidv4 } from "uuid";
import { FirebaseApp } from "./firebase";

export class Client {
  private firebase: FirebaseApp;
  private players: string[];
  readonly uuid: string;
  constructor(firebase: FirebaseApp, playerId: string) {
    this.firebase = firebase;
    this.players.push(playerId);
    this.uuid = uuidv4();
  }

  public nOfPlayers(): number {
    return this.players.length;
  }
}
