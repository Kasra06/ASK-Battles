class Controller {
    static w = false;
    static a = false;
    static s = false;
    static d = false;
    static mouseX = 0;
    static mouseY = 0;
    game;
    constructor(game) {
        this.game = game;
        document.addEventListener("keydown", (e) => this.handleKeyDown(e));
        document.addEventListener("keyup", (e) => this.handleKeyUp(e));
        document.addEventListener("mousemove", (e) => this.handleMouseMove(e));
    }
    handleKeyDown(e) {
        if (e.key === "w") {
            Controller.w = true;
        }
        if (e.key === "a") {
            Controller.a = true;
        }
        if (e.key === "s") {
            Controller.s = true;
        }
        if (e.key === "d") {
            Controller.d = true;
        }
    }
    handleKeyUp(e) {
        if (e.key === "w") {
            Controller.w = false;
        }
        if (e.key === "a") {
            Controller.a = false;
        }
        if (e.key === "s") {
            Controller.s = false;
        }
        if (e.key === "d") {
            Controller.d = false;
        }
    }
    handleMouseMove(event) {
        //Where the canvas is
        const rect = this.game.canvas.element.getBoundingClientRect();
        //Where the mouse is
        Controller.mouseX = event.clientX - rect.left;
        Controller.mouseY = event.clientY - rect.top;
    }
}
export { Controller };
//# sourceMappingURL=controller.js.map