import fabric from "fabric/fabric-impl";
import { CanvasEventHandler, CanvasEventObject } from "./CanvasEventModel";

interface TextCanvasEvent extends CanvasEventObject {
    object: fabric.IText,
}

export class TextCanvasMouseUpEvent implements CanvasEventHandler<TextCanvasEvent> {
    handle(e: TextCanvasEvent): void {
        e.canvasStore.canvas.add(e.object);
    }
}

export class TextCanvasMouseDownEvent implements CanvasEventHandler<TextCanvasEvent> {
    handle(e: TextCanvasEvent): void {
        e.object = new fabric.IText("텍스트를 입력해주세요");
    }
}

export class TextCanvasMouseMoveEvent implements CanvasEventHandler<TextCanvasEvent> {
    handle(e: TextCanvasEvent): void {
    }
}
