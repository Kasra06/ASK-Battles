import { v4 as uuidv4 } from "uuid";
export class Client {
    firebase;
    players;
    uuid;
    constructor(firebase, playerId) {
        this.firebase = firebase;
        this.players.push(playerId);
        this.uuid = uuidv4();
    }
    nOfPlayers() {
        return this.players.length;
    }
}
//# sourceMappingURL=client.js.map