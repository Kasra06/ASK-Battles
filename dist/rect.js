export class Rect {
    _x;
    _y;
    _width;
    _height;
    colour;
    _canvas;
    constructor(_x, _y, _width, _height, colour, _canvas) {
        this._x = _x;
        this._y = _y;
        this._width = _width;
        this._height = _height;
        this.colour = colour;
        this._canvas = _canvas;
    }
    draw() {
        this.canvas.context.fillStyle = this.colour;
        this.canvas.context.beginPath();
        this.canvas.context.rect(this._x, this._y, this._width, this._height);
        this.canvas.context.fill();
    }
    get width() {
        return this._width;
    }
    get height() {
        return this._height;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    set x(value) {
        this._x = value;
    }
    set y(value) {
        this._y = value;
    }
    get canvas() {
        return this._canvas;
    }
}
/**
 * This class creates a rectangle that will have a picure filling the center rather than a solid colour. This is used for every image seen in the game.
 * @image - The image to be used. All the images are stored in the html as a hidden image, and the image is chosen when a new instance is created.
 */
class Picture extends Rect {
    _image;
    constructor(x, y, width, height, image, canvas) {
        super(x, y, width, height, "black", canvas);
        this._image = image;
    }
    /**
     * Changes it so you put an image rather than filling it with a colour
     */
    draw() {
        this.canvas.context.drawImage(this._image, this.x, this.y, this._width, this._height);
        this.canvas.context.beginPath();
        this.canvas.context.rect(this.x, this.y, this._width, this._height);
    }
    get image() {
        return this._image;
    }
    get x() {
        return this._x;
    }
    get y() {
        return this._y;
    }
    set x(value) {
        this._x = value;
    }
    set y(value) {
        this._y = value;
    }
}
//# sourceMappingURL=rect.js.map