import { IEvent } from "fabric/fabric-impl";
import { RootStore, Store } from "./rootStore";

export enum ObjectEventType {
    OBJECT_SCALING = "object:scaling",
    OBJECT_MODIFIED = "object:modified",
}

export class ObjectEventStore implements Store {
    private readonly listeners: any;
    private readonly observer: Map<ObjectEventType, Set<(e: IEvent) => void>> = new Map();

    constructor(private readonly rootStore: RootStore) {
        this.listeners = {
            onScaling: this.onScaling.bind(this),
            onModified: this.onModified.bind(this),
        }
    }

    onInit() {
        this.addEventListener();
    }

    onDestroy() {
        this.removeEventListener();
    }

    private addEventListener() {
        const {canvas} = this.rootStore.canvasStore;
        canvas.on(ObjectEventType.OBJECT_SCALING, this.listeners.onScaling);
        canvas.on(ObjectEventType.OBJECT_MODIFIED, this.listeners.onModified);
    }

    private removeEventListener() {
        const {canvas} = this.rootStore.canvasStore;
        canvas.off(ObjectEventType.OBJECT_SCALING, this.listeners.onScaling);
        canvas.off(ObjectEventType.OBJECT_MODIFIED, this.listeners.onModified);
    }

    private onScaling(e: IEvent) {
        this.observer.get(ObjectEventType.OBJECT_SCALING)?.forEach(callbackFn => callbackFn(e));
    }

    private onModified(e: IEvent) {
        this.observer.get(ObjectEventType.OBJECT_MODIFIED)?.forEach(callbackFn => callbackFn(e));
    }

    subscribe(eventType: ObjectEventType, listener: (e: IEvent) => void) {
        if (!this.observer.has(eventType)) {
            this.observer.set(eventType, new Set());
        }

        this.observer.get(eventType)?.add(listener);
    }

    unsubscribe(eventType: ObjectEventType, listener: (e: IEvent) => void) {
        this.observer.get(eventType)?.delete(listener);
    }
}

export default ObjectEventStore;