import { Rect } from "./rect.js";
export class Ballon extends Rect {
    wayPoints = [
        { x: 754, y: -70 },
        { x: 758, y: 558 },
        { x: 184, y: 554 },
        { x: 184, y: 272 },
        { x: 564, y: 272 },
        { x: 566, y: 806 },
        {
            x: 254,
            y: 806,
        },
        {
            x: 254,
            y: 956,
        },
        {
            x: 254,
            y: 1000,
        },
    ];
    // this waypoint should prob be in game maybe put in here for now
    // this array is prob going to be in the game class or smth, getting position of every tile we can place a building at and saving x and y position
    angle;
    wayPointIndex = 1;
    xDistance;
    yDistance;
    currentWayPoint;
    constructor(x, y, width, height, colour, canvas) {
        super(x, y, width, height, colour, canvas);
    }
    move() {
        this.currentWayPoint = this.wayPoints[this.wayPointIndex];
        this.yDistance = this.currentWayPoint.y - this.y - this.height / 2;
        this.xDistance = this.currentWayPoint.x - this.x - this.width / 2;
        this.angle = Math.atan2(this.yDistance, this.xDistance);
        this.x += Math.cos(this.angle);
        this.y += Math.sin(this.angle);
        this.checkWavePoint();
    }
    checkWavePoint() {
        if (Math.round(this.x + this.width / 2) ===
            Math.round(this.currentWayPoint.x) &&
            Math.round(this.y + this.height / 2) ===
                Math.round(this.currentWayPoint.y) &&
            this.wayPointIndex < this.wayPoints.length - 1) {
            this.wayPointIndex++;
        }
        if (this.wayPointIndex == this.wayPoints.length - 1) {
        }
    }
}
//# sourceMappingURL=ballon.js.map