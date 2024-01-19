export class Controller {
    canvas;
    _mouseX;
    _mouseY;
    _isClicked = false;
    constructor(canvas) {
        this.canvas = canvas;
        document.addEventListener("mousemove", (event) => this.handleMouseMove(event));
        document.addEventListener("click", (event) => this.handleMouseClick(event));
    }
    handleMouseMove(event) {
        //Update our mouse position
        this._mouseX = event.clientX - this.canvas.clientX;
        this._mouseY = event.clientY - this.canvas.clientY;
    }
    handleMouseClick(event) {
        this._isClicked = true;
    }
    get mouseX() {
        return this._mouseX;
    }
    get mouseY() {
        return this._mouseY;
    }
    get isClicked() {
        return this._isClicked;
    }
    set isClicked(bool) {
        this._isClicked = bool;
    }
}
//# sourceMappingURL=controller.js.map