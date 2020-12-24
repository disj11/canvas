import {makeAutoObservable} from "mobx";
import {fabric} from "fabric";

export class CanvasStore {
    public readonly canvasId = "canvas";
    private _canvas = {} as fabric.Canvas;
    private _width = 500;
    private _height = 500;
    private _backgroundColor = "white";

    constructor() {
        makeAutoObservable(this);
    }

    public initCanvas(el: HTMLCanvasElement, options?: fabric.ICanvasOptions) {
        this._canvas = new fabric.Canvas(el, options);
    }

    get canvas() {
        return this._canvas;
    }

    get width(): number {
        return this._width;
    }

    set width(value: number) {
        this._width = value;
    }

    get height(): number {
        return this._height;
    }

    set height(value: number) {
        this._height = value;
    }

    get backgroundColor(): string {
        return this._backgroundColor;
    }

    set backgroundColor(value: string) {
        this._backgroundColor = value;
    }
}