import { Game } from "./game";
import { Controller } from "./controller";
export class Canvas {
  private _clientX: number;
  private _clientY: number;
  private _height: number = 896;
  private _width: number = 960;
  private _element: HTMLCanvasElement;
  private _context: CanvasRenderingContext2D;
  private _controller: Controller;
  private game: Game;
  constructor() {
    this._element = document.getElementById("screen") as HTMLCanvasElement;
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
  public get height(): number {
    return this._height;
  }

  public get width(): number {
    return this._width;
  }

  public get element(): HTMLCanvasElement {
    return this._element;
  }

  public get context(): CanvasRenderingContext2D {
    return this._context;
  }
  public get clientX(): number {
    return this._clientX;
  }

  public get clientY(): number {
    return this._clientY;
  }
  public get controller(): Controller {
    return this._controller;
  }
}
