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
        this.canvas.defaultCursor = "default";
        this.setSelectable(false);

        if (mode === ToolTypes.BRUSH) {
            const { brushStore } = this.rootStore;
            brushStore.setBrushType(brushStore.brushType);
        } else if (mode === ToolTypes.SELECT) {
            this.setSelectable(true);
        } else if (mode === ToolTypes.SHAPE) {
            this.canvas.defaultCursor = "crosshair";
        } else if (mode === ToolTypes.TEXT) {
            this.canvas.defaultCursor = "text";
        }
    }

    private setSelectable(selectable: boolean) {
        this.canvas.selection = selectable;
        this.canvas.getObjects().forEach(obj => {
            obj.selectable = selectable;
            obj.hoverCursor = selectable ? "move" : "default";
        });
    }
}