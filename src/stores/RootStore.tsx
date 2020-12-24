import {CanvasStore} from "./CanvasStore";

export class RootStore {
    public readonly canvasStore;

    constructor() {
        this.canvasStore = new CanvasStore();
    }
}