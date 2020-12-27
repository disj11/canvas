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
            fontSize: 20,
        });

        e.canvasStore.canvas.add(e.object);
        e.canvasStore.selectedTool = ToolTypes.SELECT;
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
