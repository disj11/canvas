import { fabric } from "fabric";
import { CanvasEventHandler, CanvasEventObject } from "./CanvasEventModel";
import { ToolTypes } from "./ToolTypes";

interface TextCanvasEvent extends CanvasEventObject {
    object: fabric.IText,
}

export class TextCanvasMouseUpEvent implements CanvasEventHandler<TextCanvasEvent> {
    handle(e: TextCanvasEvent): void {
        e.object = new fabric.IText("텍스트를 입력해주세요", {
            top: e.currentCursorPosition.y,
            left: e.currentCursorPosition.x,
            fontSize: 24,
        });

        const canvasStore = e.rootStore.canvasStore;
        canvasStore.canvas.add(e.object);
        canvasStore.selectedTool = ToolTypes.SELECT;
        canvasStore.canvas.setActiveObject(e.object);

        e.object.selectAll();
        e.object.enterEditing();
    }
}

export class TextCanvasMouseDownEvent implements CanvasEventHandler<TextCanvasEvent> {
    handle(e: TextCanvasEvent): void {
    }
}

export class TextCanvasMouseMoveEvent implements CanvasEventHandler<TextCanvasEvent> {
    handle(e: TextCanvasEvent): void {
    }
}
