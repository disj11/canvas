import {ToolTypes} from "./ToolTypes";
import {CanvasStore} from "../../stores/CanvasStore";

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
            case ToolTypes.TEXT:
                return new TextCanvasMode(canvasStore);
            default:
                return new DefaultCanvasMode(canvasStore);
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
        this.canvasStore.canvas.isDrawingMode = true;
    }
}

class ShapeCanvasMode extends CanvasMode {
    protected setTool(): void {
        this.canvasStore.canvas.defaultCursor = "crosshair";
    }
}

class TextCanvasMode extends CanvasMode {
    protected setTool(): void {
        this.canvasStore.canvas.defaultCursor = "text";
    }
}

class DefaultCanvasMode extends CanvasMode {
    protected setTool(): void {
        //
    }
}