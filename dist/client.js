//@ts-ignore import module
import { v4 as uuid4 } from "https://cdn.skypack.dev/pin/uuid@v9.0.1-Qyvn3A5kWlDfdUqj1DBN/mode=imports/optimized/uuid.js";
class Client {
    firebase;
    players = [];
    _uuid;
    constructor(firebase, roomId = null) {
        this.firebase = firebase;
        this._uuid = roomId ? roomId : uuid4();
    }
    nOfPlayers() {
        return this.players.length;
    }
    get uid() {
        return this._uuid;
    }
}
export { Client };
//# sourceMappingURL=client.js.map