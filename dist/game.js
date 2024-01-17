// @ts-ignore Import module
import { Controller } from "./controller.js";
// @ts-ignore Import module
import { Character, Player } from "./character.js";
// @ts-ignore Import module
import { Canvas } from "./canvas.js";
// @ts-ignore Import module
import { FirebaseApp } from "./firebase.js";
// @ts-ignore Import module
import { set } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
// @ts-ignore Import module
import { onDisconnect } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
// @ts-ignore Import module
import { ref } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
// @ts-ignore Import module
import { onValue } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
class Game {
    fps = 60;
    characters = {};
    canvas;
    firebase;
    controller;
    player;
    interval;
    constructor(canvas) {
        this.canvas = canvas;
        this.firebase = new FirebaseApp();
        this.controller = new Controller(this);
        this.player = new Player(this);
        onDisconnect(set(ref(this.firebase.db, "/players"), this.characters));
        this.interval = setInterval(() => {
            this.updateEverything();
            this.drawEverything();
        }, 1000 / this.fps);
    }
    drawEverything() {
        this.canvas.context.clearRect(0, 0, Canvas.width, Canvas.height);
        this.player.draw();
        //Draw all the other characters
        const properties = Object.keys(this.characters);
        for (let i = 0; i < properties.length; i++) {
            const property = properties[i];
            const x = this.characters[property].x;
            const y = this.characters[property].y;
            const colour = this.characters[property].colour;
            Character.draw(this, x, y, colour);
        }
    }
    updateEverything() {
        this.player.update();
        //Grab everything from the database and save it locally to my game
        onValue(ref(this.firebase.db, "/players"), (snapshot) => {
            this.characters = snapshot.val();
            //Remove the player, but keep all the other users
            delete this.characters[this.player.id];
        }, { onlyOnce: true });
    }
}
export { Game };
//# sourceMappingURL=game.js.map