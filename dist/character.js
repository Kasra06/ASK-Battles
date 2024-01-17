// @ts-ignore Import module
import { Physics } from "./physics.js";
// @ts-ignore Import module
import { Canvas } from "./system.js";
// @ts-ignore Import module
import { Controller } from "./controller.js";
// @ts-ignore Import module
import { update } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
// @ts-ignore Import module
import { ref } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
// @ts-ignore Import module
import { nanoid } from "https://cdnjs.cloudflare.com/ajax/libs/nanoid/3.3.4/nanoid.min.js";
class Character {
    static width = 25;
    static height = 25;
    game;
    x;
    y;
    colour;
    static draw(game, x, y, colour) {
        game.canvas.context.fillStyle = colour;
        game.canvas.context.fillRect(x, y, Character.width, Character.height);
    }
}
class Player extends Character {
    id = nanoid(10);
    constructor(game) {
        super();
        this.game = game;
        this.colour = `rgb(${Player.randomizer(255)}, ${Player.randomizer(255)}, ${Player.randomizer(255)})`;
        this.x = Player.randomizer(Canvas.width);
        this.y = Player.randomizer(Canvas.height);
        this.firebaseUpdate();
    }
    update() {
        if (Controller.w) {
            this.y -= 1;
            if (Physics.hasHitBorder(this)) {
                this.y += 1;
            }
        }
        if (Controller.a) {
            this.x -= 1;
            if (Physics.hasHitBorder(this)) {
                this.x += 1;
            }
        }
        if (Controller.s) {
            this.y += 1;
            if (Physics.hasHitBorder(this)) {
                this.y -= 1;
            }
        }
        if (Controller.d) {
            this.x += 1;
            if (Physics.hasHitBorder(this)) {
                this.x -= 1;
            }
        }
        this.firebaseUpdate();
    }
    draw() {
        this.game.canvas.context.fillStyle = this.colour;
        this.game.canvas.context.fillRect(this.x, this.y, Character.width, Character.height);
    }
    firebaseUpdate() {
        update(ref(this.game.firebase.db, "/players"), {
            [this.id]: {
                x: this.x,
                y: this.y,
                colour: this.colour,
            },
        });
    }
    static randomizer(val) {
        return Math.floor(Math.random() * val);
    }
}
export { Character, Player };
//# sourceMappingURL=character.js.map