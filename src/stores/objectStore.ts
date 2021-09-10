import {RootStore, Store} from "./rootStore";
import {SelectionEventStore} from "./selectionEventStore";
import {makeAutoObservable} from "mobx";
import {fabric} from "fabric";
import {ShapeType} from "../models/tools/Shape";

export class ObjectStore implements Store {
    private readonly selectionEventStore: SelectionEventStore;
    private readonly listeners: any;

    public activeObject: fabric.Object | undefined;

    constructor(
        private readonly rootStore: RootStore,
    ) {
        makeAutoObservable(this);
        this.selectionEventStore = rootStore.selectionEventStore;
        this.listeners = {
            updateObject: this.updateObject.bind(this),
        }
    }

    onInit(): void {
        this.addReactions();
    }

    onDestroy(): void {
        this.removeReactions();
    }

    private updateObject(object: fabric.Object | undefined) {
        this.activeObject = object;
    }

    private addReactions() {
        this.selectionEventStore.subscribe(this.listeners.updateObject);
    }

    private removeReactions() {
        this.selectionEventStore.unsubscribe(this.listeners.updateObject);
    }

    public isRect(object = this.activeObject) {
        return object?.isType(ShapeType.RECT.value);
    }

    public isEllipse(object = this.activeObject) {
        return object?.isType(ShapeType.ELLIPSE.value);
    }

    public isTriangle(object = this.activeObject) {
        return object?.isType(ShapeType.TRIANGLE.value);
    }

    public isShape(object = this.activeObject) {
        return this.isRect(object) || this.isEllipse(object) || this.isTriangle(object);
    }

    public isPath(object = this.activeObject) {
        return object?.isType("path");
    }

    public isText(object = this.activeObject) {
        return object?.isType("i-text");
    }

    public isActiveSelection(object = this.activeObject) {
        return object?.isType("activeSelection");
    }

    public isGroup(object = this.activeObject) {
        return object?.isType("group");
    }

    public getObjectTypeName(object = this.activeObject): string {
        if (this.isRect(object)) {
            return ShapeType.RECT.display;
        } else if (this.isEllipse(object)) {
            return ShapeType.ELLIPSE.display;
        } else if (this.isTriangle(object)) {
            return ShapeType.TRIANGLE.display;
        } else if (this.isPath(object)) {
            return "패스";
        } else if (this.isText(object)) {
            return "텍스트";
        } else if (this.isGroup(object)) {
            return "그룹"
        } else {
            return "오브젝트";
        }
    }

    public setFill(value: string | undefined, object = this.activeObject) {
        this.setStyles("fill", value, object);
    }

    public setStroke(value: string | undefined, object = this.activeObject) {
        this.setStyles("stroke", value, object);
    }

    public setStrokeWidth(value: number | undefined, object = this.activeObject) {
        this.setStyles("strokeWidth", value, object);
    }

    private setStyles(key: keyof fabric.Object, value: any, object = this.activeObject) {
        object?.set(key, value);
    }
}