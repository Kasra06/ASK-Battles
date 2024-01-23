import { Rect } from "./rect.js";
import { Canvas } from "./canvas.js";
import { Controller } from "./controller.js";
export class PlacementTile extends Rect {
  private controller: Controller;
  private _used: boolean = false;
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    colour: string,
    canvas: Canvas,
    controller: Controller
  ) {
    super(x, y, width, height, colour, canvas);
    this.controller = controller;
  }
  public checkMousePlacement() {
    if (
      this.controller.mouseX > this.x &&
      this.controller.mouseX < this.x + this.width &&
      this.controller.mouseY > this.y &&
      this.controller.mouseY < this.y + this.height
    ) {
      this.colour = "white";
    } else {
      this.colour = "rgba(255, 255, 255, 0.1)";
    }
  }
  public get used(): boolean {
    return this._used;
  }
  public set used(bool: boolean) {
    this._used = bool;
  }
}
