import { Game } from "./game.js";
class Canvas {
    static width = 1200;
    static height = 800;
    element;
    context;
    game;
    constructor() {
        this.element = document.getElementById("gameScreen");
        this.context = this.element.getContext("2d");
        this.element.width = Canvas.width;
        this.element.height = Canvas.height;
        this.game = new Game(this);
    }
}
new Canvas();
export { Canvas };
//# sourceMappingURL=canvas.js.map