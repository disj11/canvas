import { BrushStore } from "./BrushStore";
import {CanvasStore} from "./CanvasStore";
import { ShapeStore } from "./ShapeStore";

export class RootStore {
    public readonly canvasStore;
    public readonly brushStore;
    public readonly shapeStore;

    constructor() {
        this.canvasStore = new CanvasStore(this);
        this.brushStore = new BrushStore(this);
        this.shapeStore = new ShapeStore();
    }
}