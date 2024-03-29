import {IEvent, Transform} from "fabric/fabric-impl";
import { makeAutoObservable, reaction } from "mobx";
import { CanvasStore } from "./canvasStore";
import { RootStore } from "./rootStore";
import {fabric} from "fabric";
import {DeleteControl} from "../models/object/DeleteControl";

export enum SelectionEventType {
    SELECTION_CLEARED = "selection:cleared",
    SELECTION_CREATED = "selection:created",
    SELECTION_UPDATED = "selection:updated",
}

export class SelectionEventStore {
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
        this.initControl();
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

    private initControl() {
        DeleteControl.init(this.removeActiveObjects);
    }

    private removeActiveObjects(_eventData: MouseEvent, transform: Transform): boolean {
        const canvas = transform.target.canvas;
        if (!canvas) {
            return false;
        }

        const activeObjects = canvas.getActiveObjects();
        if (activeObjects.length === 0) {
            return false;
        }

        canvas.getActiveObjects().forEach(object => canvas.remove(object));
        canvas.discardActiveObject();
        canvas.requestRenderAll();
        return true;
    }

    subscribe(listener: (object: fabric.Object | undefined) => void) {
        this.observer.add(listener);
    }

    unsubscribe(listener: (object: fabric.Object | undefined) => void) {
        this.observer.delete(listener);
    }
}