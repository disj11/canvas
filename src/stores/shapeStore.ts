import { makeAutoObservable } from "mobx";
import { ShapeType } from "models/tools/Shape";
import { MouseEventObject, MouseEventStore, MouseEventType } from "./mouseEventStore";
import { RootStore } from "./rootStore";

const defaultStyles = {
    shapeType: ShapeType.RECT,
    fill: "transparency",
}

export class ShapeStore {
    private readonly mouseEventStore: MouseEventStore;

    shapeType = defaultStyles.shapeType;
    fill = defaultStyles.fill;
    item = this.shapeType.getShape();

    constructor(private readonly rootStore: RootStore) {
        makeAutoObservable(this);
        this.mouseEventStore = rootStore.mouseEventStore;
        this.addEventListeners();
    }

    private addEventListeners() {
        this.mouseEventStore.subscribe(MouseEventType.MOUSE_UP, this.onMouseUp.bind(this));
        this.mouseEventStore.subscribe(MouseEventType.MOUSE_DOWN, this.onMouseDown.bind(this));
        this.mouseEventStore.subscribe(MouseEventType.MOUSE_MOVE, this.onMouseMove.bind(this));
    }


    private onMouseUp(e: MouseEventObject) {

    }

    private onMouseMove(e: MouseEventObject) {

    }

    private onMouseDown(e: MouseEventObject) {

    }

    private createItem() {
        this.item = this.shapeType.getShape();
    }
}