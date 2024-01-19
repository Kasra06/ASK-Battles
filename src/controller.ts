import { Canvas } from "./canvas";
export class Controller {
  private _mouseX: number;
  private _mouseY: number;
  private _isClicked: boolean = false;
  constructor(private canvas: Canvas) {
    document.addEventListener("mousemove", (event) =>
      this.handleMouseMove(event)
    );
    document.addEventListener("click", (event) => this.handleMouseClick(event));
  }

  public handleMouseMove(event): void {
    //Update our mouse position
    this._mouseX = event.clientX - this.canvas.clientX;
    this._mouseY = event.clientY - this.canvas.clientY;
  }
  private handleMouseClick(event: MouseEvent): void {
    this._isClicked = true;
  }
  public get mouseX() {
    return this._mouseX;
  }

  public get mouseY() {
    return this._mouseY;
  }
  public get isClicked(): boolean {
    return this._isClicked;
  }
  public set isClicked(bool: boolean) {
    this._isClicked = bool;
  }
}
