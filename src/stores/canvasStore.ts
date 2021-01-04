import { makeAutoObservable } from "mobx";
import { ToolTypes } from "models/tools/ToolTypes";
import { RootStore } from "./rootStore";

const defaultStyles = {
    width: 500,
    height: 500,
    backgroundColor: "#ffffff",
}

export class CanvasStore {
    width = defaultStyles.width;
    height = defaultStyles.height;
    backgroundColor = defaultStyles.backgroundColor;
    canvasMode = ToolTypes.BRUSH;

    constructor(
        private readonly rootStore: RootStore,
        readonly canvas: fabric.Canvas,
    ) {
        makeAutoObservable(this);
        this.canvas.setWidth(this.width);
        this.canvas.setHeight(this.height);
        this.canvas.setBackgroundColor(this.backgroundColor, () => { });
    }

    init() {
        this.setCanvasMode(this.canvasMode);
    }

    setCanvasMode(mode: ToolTypes) {
        this.canvasMode = mode;
        this.canvas.discardActiveObject().renderAll();
        this.canvas.isDrawingMode = mode === ToolTypes.BRUSH;

        if (mode === ToolTypes.BRUSH) {
            const { brushStore } = this.rootStore;
            brushStore.setBrushType(brushStore.brushType);
        }
    }
}