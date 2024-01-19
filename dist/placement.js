import { Rect } from "./rect.js";
export class PlacementTile extends Rect {
    controller;
    _used = false;
    constructor(x, y, width, height, colour, canvas, controller) {
        super(x, y, width, height, colour, canvas);
        this.controller = controller;
    }
    checkMousePlacement() {
        if (this.controller.mouseX > this.x &&
            this.controller.mouseX < this.x + this.width &&
            this.controller.mouseY > this.y &&
            this.controller.mouseY < this.y + this.height) {
            this.colour = "white";
        }
        else {
            this.colour = "rgba(255, 255, 255, 0.1)";
        }
    }
    get used() {
        return this._used;
    }
    set used(bool) {
        this._used = bool;
    }
}
//# sourceMappingURL=placement.js.map