// import { v4 } from "uuid";
class Client {
    firebase;
    players = [];
    _uuid;
    constructor(firebase, playerId) {
        this.firebase = firebase;
        this.players[0] = playerId;
        this._uuid = "213";
    }
    nOfPlayers() {
        return this.players.length;
    }
    get uuid() {
        return this._uuid;
    }
}
export { Client };
//# sourceMappingURL=client.js.map