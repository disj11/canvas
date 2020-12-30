import { makeAutoObservable } from "mobx";
import { BrushType } from "models/canvas/Brush";
import { CanvasStore } from "./CanvasStore";
import { RootStore } from "./RootStore";

export class BrushStore {
    private readonly canvasStore: CanvasStore;
    private _brushType = BrushType.PENCIL;
    private _lineWidth = 1;
    private _color = "#000000";

    constructor(rootStore: RootStore) {
        this.canvasStore = rootStore.canvasStore;
        makeAutoObservable(this);
    }

    get brushType() {
        return this._brushType;
    }

    get color() {
        return this._color;
    }

    get lineWidth() {
        return this._lineWidth;
    }

    public setBrushType(value: BrushType) {
        this._brushType = value;
        const canvas = this.canvasStore.canvas;
        canvas.freeDrawingBrush = value.getBrush(canvas);
    }

    public setColor(value: string) {
        this._color = value;
        const canvas = this.canvasStore.canvas;
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.color = value;
        }
    }

    public setLineWidth(value: number) {
        this._lineWidth = value;
        const canvas = this.canvasStore.canvas;
        if (canvas.freeDrawingBrush) {
            canvas.freeDrawingBrush.width = value;
        }
    }
}