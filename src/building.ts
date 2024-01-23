import { Rect } from "./rect.js";
import { Canvas } from "./canvas.js";
export class Building extends Rect {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    colour: string,
    canvas: Canvas
  ) {
    super(x, y, width, height, colour, canvas);
  }
}
