import { Canvas } from "./canvas.js";
class Physics {
    constructor() { }
    static circleHasHitRect(obj1, obj2) {
        if (obj1.x + obj1.radius > obj2.x &&
            obj1.x - obj1.radius < obj2.x + obj2.width &&
            obj1.y + obj1.radius > obj2.y &&
            obj1.y - obj1.radius < obj2.y + obj2.height) {
            return true;
        }
        return false;
    }
    static hasHitBorder(obj) {
        if (obj.x < 0 ||
            obj.x + obj.width > Canvas.width ||
            obj.y < 0 ||
            obj.y + obj.height > Canvas.height) {
            return true;
        }
        return false;
    }
}
export { Physics };
//# sourceMappingURL=physics.js.map