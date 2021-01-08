import { IEvent } from "fabric/fabric-impl";
import { RootStore, Store } from "./rootStore";

export enum MouseEventType {
    MOUSE_UP = "mouse:up",
    MOUSE_DOWN = "mouse:down",
    MOUSE_MOVE = "mouse:move",
}

export interface MouseEventObject {
    startCursorPosition: {x: number, y: number},
    currentCursorPosition: {x: number, y: number},
}

export class MouseEventStore implements Store {
    private readonly listeners: any;
    private startCursorPosition = { x: 0, y: 0 };
    private currentCursorPosition = { x: 0, y: 0 };
    private observer: Map<MouseEventType, Array<(e: MouseEventObject) => void>> = new Map();

    constructor(private readonly rootStore: RootStore) {
        // this.addEventListeners();
        this.listeners = {
            onMouseDown: this.onMouseDown.bind(this),
            onMouseUp: this.onMouseUp.bind(this),
            onMouseMove: this.onMouseMove.bind(this),
        }
    }

    onInit() {
        this.addEventListeners();
    }

    onDestory() {
        this.removeEventListeners();
    }

    subscribe(eventType: MouseEventType, listener: (e: MouseEventObject) => void) {
        if (!this.observer.has(eventType)) {
            this.observer.set(eventType, []);
        }
        
        this.observer.get(eventType)?.push(listener);
    }

    unsubscribe(eventType: MouseEventType, listener: (e: MouseEventObject) => void) {
        this.observer.set(eventType, this.observer.get(eventType)?.filter(fn => fn !== listener) || []);
    }

    private onMouseDown(e: IEvent) {
        this.startCursorPosition = { ...this.getCursorPosition(e) };
        this.currentCursorPosition = { ...this.getCursorPosition(e) };

        this.observer.get(MouseEventType.MOUSE_DOWN)?.forEach(callback => callback({
            startCursorPosition: this.startCursorPosition,
            currentCursorPosition: this.currentCursorPosition,    
        }))
    }

    private onMouseMove(e: IEvent) {
        this.currentCursorPosition = { ...this.getCursorPosition(e) };

        this.observer.get(MouseEventType.MOUSE_MOVE)?.forEach(callback => callback({
            startCursorPosition: this.startCursorPosition,
            currentCursorPosition: this.currentCursorPosition,    
        }))
    }

    private onMouseUp(e: IEvent) {
        this.currentCursorPosition = { ...this.getCursorPosition(e) };

        this.observer.get(MouseEventType.MOUSE_UP)?.forEach(callback => callback({
            startCursorPosition: this.startCursorPosition,
            currentCursorPosition: this.currentCursorPosition,    
        }))
    }

    private addEventListeners() {
        const { canvas } = this.rootStore.canvasStore;
        canvas.on(MouseEventType.MOUSE_DOWN, this.listeners.onMouseDown);
        canvas.on(MouseEventType.MOUSE_MOVE, this.listeners.onMouseMove);
        canvas.on(MouseEventType.MOUSE_UP, this.listeners.onMouseUp);
    }

    private removeEventListeners() {
        const { canvas } = this.rootStore.canvasStore;
        canvas.off(MouseEventType.MOUSE_DOWN, this.listeners.onMouseDown);
        canvas.off(MouseEventType.MOUSE_MOVE, this.listeners.onMouseMove);
        canvas.off(MouseEventType.MOUSE_UP, this.listeners.onMouseUp);
    }

    private getCursorPosition(e: IEvent) {
        return this.rootStore.canvasStore.canvas.getPointer(e.e);
    }
}