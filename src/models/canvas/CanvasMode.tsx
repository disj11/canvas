import {ToolTypes} from "./ToolTypes";
import {CanvasStore} from "../../stores/CanvasStore";
import {BrushFactory} from "./Brush";

abstract class CanvasMode {
    constructor(protected canvasStore: CanvasStore) {
    }

    protected abstract setTool(): void;

    private resetCanvas() {
        this.canvasStore.canvas.isDrawingMode = false;
        this.canvasStore.selectable = false;
        this.canvasStore.canvas.defaultCursor = "default";
        this.canvasStore.canvas.discardActiveObject().renderAll();
    }

    public select() {
        this.resetCanvas();
        this.setTool();
    }
}

export class CanvasModeFactory {
    public static getInstance(canvasStore: CanvasStore): CanvasMode {
        switch (canvasStore.selectedTool) {
            case ToolTypes.SELECT:
                return new SelectCanvasMode(canvasStore);
            case ToolTypes.BRUSH:
                return new BrushCanvasMode(canvasStore);
            case ToolTypes.SHAPE:
                return new ShapeCanvasMode(canvasStore);
            default:
                return new BrushCanvasMode(canvasStore);
        }
    }
}

class SelectCanvasMode extends CanvasMode {
    protected setTool(): void {
        this.canvasStore.selectable = true;
    }
}

class BrushCanvasMode extends CanvasMode {
    protected setTool(): void {
        const canvas = this.canvasStore.canvas;
        canvas.isDrawingMode = true;
        canvas.freeDrawingBrush = BrushFactory.getInstance(this.canvasStore.brushType, canvas);
    }
}

class ShapeCanvasMode extends CanvasMode {
    protected setTool(): void {
        this.canvasStore.canvas.defaultCursor = "crosshair";
    }
}