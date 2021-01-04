import { IEvent } from "fabric/fabric-impl";
import { makeAutoObservable, reaction } from "mobx";
import { CanvasStore } from "./canvasStore";
import { RootStore } from "./rootStore";

export enum EventType {
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
        this.canvasStore.canvas.on(EventType.SELECTION_CREATED, this.listeners.onSelected);
        this.canvasStore.canvas.on(EventType.SELECTION_UPDATED, this.listeners.onSelected);
        this.canvasStore.canvas.on(EventType.SELECTION_CLEARED, this.listeners.onCleared);
        reaction(
            () => this.activeObject,
            () => {
                this.observer.forEach(callback => callback(this.activeObject));
            },
        );
    }

    subscribe(listener: (object: fabric.Object | undefined) => void) {
        this.observer.add(listener);
    }

    unsubscribe(listener: (object: fabric.Object | undefined) => void) {
        this.observer.delete(listener);
    }
}