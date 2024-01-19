import { Rect } from "./rect";
import { Canvas } from "./canvas";
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
