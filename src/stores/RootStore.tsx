import { BrushStore } from "./BrushStore";
import {CanvasStore} from "./CanvasStore";

export class RootStore {
    public readonly canvasStore;
    public readonly brushStore;

    constructor() {
        this.canvasStore = new CanvasStore();
        this.brushStore = new BrushStore(this);
    }
}