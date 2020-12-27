import { IEvent } from "fabric/fabric-impl";
import { CanvasStore } from "stores/CanvasStore";

export interface CanvasEventObject {
    e: IEvent,
    canvasStore: CanvasStore,
    startCursorPosition: {x: number, y: number}
    currentCursorPosition: {x: number, y: number}
    isDown: boolean,
}

export interface CanvasEventHandler<T extends CanvasEventObject> {
    handle(e: T): void;
}