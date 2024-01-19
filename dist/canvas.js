import { Game } from "./game.js";
import { Controller } from "./controller.js";
export class Canvas {
    _clientX;
    _clientY;
    _height = 896;
    _width = 960;
    _element;
    _context;
    _controller;
    game;
    constructor() {
        this._element = document.getElementById("screen");
        this._element.height = this._height;
        this._element.width = this._width;
        //Create controller
        const boundingRect = this.element.getBoundingClientRect();
        this._clientX = boundingRect.x;
        this._clientY = boundingRect.y;
        this._controller = new Controller(this);
        //Drawing in 2D
        this._context = this._element.getContext("2d");
        //Game map
        this.game = new Game(this);
    }
    get height() {
        return this._height;
    }
    get width() {
        return this._width;
    }
    get element() {
        return this._element;
    }
    get context() {
        return this._context;
    }
    get clientX() {
        return this._clientX;
    }
    get clientY() {
        return this._clientY;
    }
    get controller() {
        return this._controller;
    }
}
//# sourceMappingURL=canvas.js.map