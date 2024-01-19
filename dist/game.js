import { Ballon } from "./ballon";
import { Building } from "./building";
import { PlacementTile } from "./placement";
// reminder a lot of stuff use 32 since its the size of the pixels of each thing, can prob make a varible in canvas or
//smth then just use that worldwide
export class Game {
    canvas;
    image;
    gameInterval;
    fps = 100;
    timeInterval = 1000 / this.fps;
    ballon = [];
    buildings = [];
    redBallon;
    // thing to hold which active tile we are currentkly on
    currentActiveTile;
    placementTiles2D = [
        [
            56, 0, 56, 0, 56, 0, 56, 0, 56, 0, 56, 0, 0, 0, 56, 0, 56, 0, 56, 0, 56,
            0, 0, 0, 0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 56, 0, 56, 0, 56, 0, 56, 0, 0, 0, 56, 0, 56, 0, 56, 0, 56,
            0, 0, 0, 0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 0, 0, 56, 0, 56, 0, 56, 0, 56, 0, 0, 0, 56, 0, 56, 0, 56, 0, 56, 0,
            0, 0, 0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 0, 0, 56, 0, 56, 0, 56, 0, 56, 0, 0, 0, 56, 0, 56, 0, 56, 0, 56, 0,
            0, 0, 0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 56, 0, 56, 0, 56, 0, 56, 0, 0, 0, 56, 0, 56, 0, 56, 0, 56,
            0, 0, 0, 0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 56, 0, 56, 0, 56, 0, 56, 0, 0, 0, 56, 0, 56, 0, 56, 0, 56,
            0, 0, 0, 0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0,
            0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0,
            0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0,
            0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0,
            0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 0, 0,
            0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 0, 0, 0, 0, 56, 0, 56, 0, 56, 0, 56, 0, 0, 0, 0, 0, 56, 0,
            0, 0, 0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 0, 0, 0, 0, 56, 0, 56, 0, 56, 0, 56, 0, 0, 0, 0, 0, 56, 0,
            0, 0, 0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 0, 0, 0, 0, 56, 0, 56, 0, 56, 0, 56, 0, 0, 0, 0, 0, 56, 0,
            0, 0, 0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 0, 0, 0, 0, 56, 0, 56, 0, 56, 0, 56, 0, 0, 0, 0, 0, 56, 0,
            0, 0, 0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
            0, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 56,
            0, 56, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 56, 0, 56, 0, 56, 0, 56, 0, 56, 0, 56, 0, 0, 0, 0, 0, 56, 0,
            56, 0, 56, 0, 56, 0, 56, 0,
        ],
        [
            56, 0, 56, 0, 56, 0, 56, 0, 56, 0, 56, 0, 56, 0, 56, 0, 0, 0, 0, 0, 56, 0,
            56, 0, 56, 0, 56, 0, 56, 0,
        ],
        [
            0, 0, 0, 0, 0, 0, 56, 0, 56, 0, 56, 0, 56, 0, 56, 0, 0, 0, 0, 0, 56, 0,
            56, 0, 56, 0, 0, 0, 56, 0,
        ],
        [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 56, 0,
            56, 0, 0, 0, 0, 0,
        ],
        [
            56, 0, 56, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 56,
            0, 0, 0, 0, 0, 0, 0,
        ],
        [
            56, 0, 56, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 56,
            0, 0, 0, 0, 0, 0, 0,
        ],
        [
            56, 0, 56, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 56,
            0, 0, 0, 0, 0, 0, 0,
        ],
        [
            56, 0, 56, 0, 56, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 56, 0, 56,
            0, 0, 0, 0, 0, 0, 0,
        ],
    ];
    placementTiles = [];
    constructor(canvas) {
        this.canvas = canvas;
        this.image = new Image();
        this.image.onload = () => {
            this.canvas.context.drawImage(this.image, 0, 0);
        };
        this.image.src = "img/MAP.png";
        this.redBallon = new Ballon(754 - 25, -70 - 25, 50, 50, "red", this.canvas);
        this.createPlacementTiles();
        //reminder redbvallon should not hold this at all game should lol
        this.ballon.push(this.redBallon);
        this.gameInterval = setInterval(() => {
            //clears the map with 10px just in case
            this.canvas.context.clearRect(-10, -10, this.canvas.width + 10, this.canvas.height + 10);
            this.drawEverything();
            this.updateEverything();
        }, this.timeInterval);
    }
    updateEverything() {
        console.log(this.canvas.controller.isClicked);
        // for (let i = 0; i < this.ballon.length; i++) {
        //   this.ballon[i].move();
        // }
        this.currentActiveTile = null;
        this.redBallon.move();
        for (let i = 0; i < this.placementTiles.length; i++) {
            this.placementTiles[i].checkMousePlacement();
        }
        this.checkActiveTile();
        if (this.canvas.controller.isClicked == true) {
            this.placeBuilding();
            this.canvas.controller.isClicked = false;
        }
    }
    drawEverything() {
        this.canvas.context.drawImage(this.image, 0, 0);
        this.redBallon.draw();
        for (let i = 0; i < this.placementTiles.length; i++) {
            // this should not be in red ballon btw should be in game jst reminder
            this.placementTiles[i].draw();
        }
        for (let i = 0; i < this.buildings.length; i++) {
            this.buildings[i].draw();
        }
    }
    createPlacementTiles() {
        for (let i = 0; i < this.placementTiles2D.length; i++) {
            for (let j = 0; j < this.placementTiles2D[i].length; j++) {
                if (this.placementTiles2D[i][j] == 56) {
                    // j and i is swapped, because x is actually for the number it is in the actual array we looking at, and y value is which array it is in
                    this.placementTiles.push(new PlacementTile(j * 32, i * 32, 32, 32, "rgba(255, 255, 255, 0.1)", this.canvas, this.canvas.controller));
                }
            }
        }
    }
    // checking which actual tile we are hovering over, if we are hovering over one for building placement
    checkActiveTile() {
        for (let i = 0; i < this.placementTiles.length; i++) {
            if (this.canvas.controller.mouseX > this.placementTiles[i].x &&
                this.canvas.controller.mouseX <
                    this.placementTiles[i].x + this.placementTiles[i].width &&
                this.canvas.controller.mouseY > this.placementTiles[i].y &&
                this.canvas.controller.mouseY <
                    this.placementTiles[i].y + this.placementTiles[i].height) {
                this.currentActiveTile = this.placementTiles[i];
                break;
            }
        }
    }
    placeBuilding() {
        if (this.currentActiveTile != null &&
            this.currentActiveTile.used == false) {
            this.buildings.push(new Building(this.currentActiveTile.x, this.currentActiveTile.y, 32 * 2, 32, "blue", this.canvas));
            this.currentActiveTile.used = true;
            console.log("okok");
        }
    }
}
//# sourceMappingURL=game.js.map