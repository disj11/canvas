import { IEvent } from "fabric/fabric-impl";
import { makeAutoObservable, reaction } from "mobx";
import { ShapeType } from "models/tools/Shape";
import { CanvasStore } from "./canvasStore";
import { RootStore } from "./rootStore";

export enum SelectionEventType {
    SELECTION_CLEARED = "selection:cleared",
    SELECTION_CREATED = "selection:created",
    SELECTION_UPDATED = "selection:updated",
}

export class ObjectManagerStore {
    private readonly canvasStore: CanvasStore;
    private readonly listeners: { [eventName: string]: (e: IEvent) => void }
    private readonly observer: Set<(object: fabric.Object | undefined) => void> = new Set();

    activeObject: fabric.Object | undefined;

    constructor(
        private readonly rootStore: RootStore,
    ) {
        makeAutoObservable(this);
        this.canvasStore = rootStore.canvasStore;
        this.listeners = {
            onSelected: this.onSelected.bind(this),
            onCleared: this.onCleared.bind(this),
        }
        this.addEventListeners();
    }

    private onSelected(e: IEvent) {
        const { target } = e;
        if (!target) {
            return;
        }

        this.activeObject = target;
    }

    private onCleared() {
        this.activeObject = undefined;
    }

    private addEventListeners() {
        this.canvasStore.canvas.on(SelectionEventType.SELECTION_CREATED, this.listeners.onSelected);
        this.canvasStore.canvas.on(SelectionEventType.SELECTION_UPDATED, this.listeners.onSelected);
        this.canvasStore.canvas.on(SelectionEventType.SELECTION_CLEARED, this.listeners.onCleared);
        reaction(
            () => this.activeObject,
            () => this.observer.forEach(callback => callback(this.activeObject)),
        );
    }

    subscribe(listener: (object: fabric.Object | undefined) => void) {
        this.observer.add(listener);
    }

    unsubscribe(listener: (object: fabric.Object | undefined) => void) {
        this.observer.delete(listener);
    }

    isRect() {
        return this.activeObject?.isType(ShapeType.RECT.value);
    }

    isEllipse() {
        return this.activeObject?.isType(ShapeType.ELLIPSE.value);
    }

    isTriangle() {
        return this.activeObject?.isType(ShapeType.TRIANGLE.value);
    }

    isShape() {
        return this.isRect() || this.isEllipse() || this.isTriangle();
    }

    isPath() {
        return this.activeObject?.isType("path");
    }

    isText() {
        return this.activeObject?.isType("i-text");
    }

    getObjectTypeName(): string {
        if (this.isRect()) {
            return ShapeType.RECT.display;
        } else if (this.isEllipse()) {
            return ShapeType.ELLIPSE.display;
        } else if (this.isTriangle()) {
            return ShapeType.TRIANGLE.display;
        } else if (this.isPath()) {
            return "패스";
        } else if (this.isText()) {
            return "텍스트";
        } else {
            return "오브젝트";
        }
    }
}