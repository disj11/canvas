import {makeAutoObservable} from "mobx";
import {fabric} from "fabric";
import {ToolTypes} from "../models/canvas/ToolTypes";
import {CanvasModeFactory} from "../models/canvas/CanvasMode";
import {CanvasEvent} from "../models/canvas/CanvasEvent";
import { RootStore } from "./RootStore";

export class CanvasStore {
    public readonly canvasId = "canvas";
    private _canvas = {} as fabric.Canvas;
    private _width = 500;
    private _height = 500;
    private _backgroundColor = "white";
    private _selectedTool: ToolTypes = ToolTypes.SELECT;
    private _selectable = false;
    private _activeObject: fabric.Object | undefined;
    private _activeObjects: fabric.Object[] = [];

    constructor(private readonly rootStore: RootStore) {
        makeAutoObservable(this);
    }

    public initCanvas(el: HTMLCanvasElement, options?: fabric.ICanvasOptions) {
        this._canvas = new fabric.Canvas(el, options);
        this.selectedTool = this._selectedTool;
        new CanvasEvent(this.rootStore).init();
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

    get selectedTool(): ToolTypes {
        return this._selectedTool;
    }

    set selectedTool(value: ToolTypes) {
        this._selectedTool = value;
        CanvasModeFactory.getInstance(this).select();
    }

    get selectable(): boolean {
        return this._selectable;
    }

    set selectable(value: boolean) {
        this.canvas.selection = value;
        this.canvas.getObjects().forEach(obj => {
            obj.selectable = value;
            obj.hoverCursor = value ? "move" : "default";
        });
    }

    get activeObject(): fabric.Object | undefined {
        return this._activeObject;
    }

    set activeObject(value: fabric.Object | undefined) {
        this._activeObject = value;
    }

    get activeObjects(): fabric.Object[] {
        return this._activeObjects;
    }

    set activeObjects(value: fabric.Object[]) {
        this._activeObjects = value;
    }
}