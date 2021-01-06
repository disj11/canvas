import { IEvent } from "fabric/fabric-impl";
import { RootStore } from "./rootStore";

export enum ObjectEventType {
    OBJECT_SCALING = "object:scaling",
    OBJECT_MODIFIED = "object:modified",
}

export class ObjectEventStore {
    private observer: Map<ObjectEventType, Set<(e: IEvent) => void>> = new Map();

    constructor(private readonly rootStore: RootStore) {
        this.addEventListener();
    }

    private addEventListener() {
        const {canvas} = this.rootStore.canvasStore;
        canvas.on(ObjectEventType.OBJECT_SCALING, this.onScaling.bind(this));
        canvas.on(ObjectEventType.OBJECT_MODIFIED, this.onModified.bind(this));
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