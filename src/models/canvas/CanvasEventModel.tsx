import { IEvent } from "fabric/fabric-impl";
import { RootStore } from "stores/RootStore";

export interface CanvasEventObject {
    e: IEvent,
    rootStore: RootStore,
    startCursorPosition: {x: number, y: number}
    currentCursorPosition: {x: number, y: number}
    isDown: boolean,
}

export interface CanvasEventHandler<T extends CanvasEventObject> {
    handle(e: T): void;
}