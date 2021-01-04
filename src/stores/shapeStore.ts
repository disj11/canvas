import { makeAutoObservable } from "mobx";
import { ShapeType } from "models/tools/Shape";
import { ToolTypes } from "models/tools/ToolTypes";
import { MouseEventObject, MouseEventStore, MouseEventType } from "./mouseEventStore";
import { RootStore } from "./rootStore";

const defaultStyles = {
    shapeType: ShapeType.RECT,
    fill: "transparent",
    strokeWidth: 3,
    stroke: "#000000",
    hasBorder: true,
}

const MIN_OBJECT_SIZE = 10;

export class ShapeStore {
    private readonly mouseEventStore: MouseEventStore;
    private isDragMode = false;

    shapeType = defaultStyles.shapeType;
    fill = defaultStyles.fill;
    strokeWidth = defaultStyles.strokeWidth;
    stroke = defaultStyles.stroke;
    item = this.shapeType.getShape();
    hasBorder = defaultStyles.hasBorder;

    constructor(private readonly rootStore: RootStore) {
        makeAutoObservable(this);
        this.mouseEventStore = rootStore.mouseEventStore;
        this.addEventListeners();
    }

    setShapeType(shapeType: ShapeType) {
        this.shapeType = shapeType;
    }

    private addEventListeners() {
        this.mouseEventStore.subscribe(MouseEventType.MOUSE_UP, this.onMouseUp.bind(this));
        this.mouseEventStore.subscribe(MouseEventType.MOUSE_DOWN, this.onMouseDown.bind(this));
        this.mouseEventStore.subscribe(MouseEventType.MOUSE_MOVE, this.onMouseMove.bind(this));
    }

    private isDrawingShapeMode() {
        return this.rootStore.canvasStore.canvasMode === ToolTypes.SHAPE;
    }

    private onMouseDown(e: MouseEventObject) {
        if (!this.isDrawingShapeMode()) {
            return;
        }

        this.isDragMode = true;
        this.item = this.shapeType.getShape({
            left: e.startCursorPosition.x,
            top: e.startCursorPosition.y,
            hasBorder: this.hasBorder,
            stroke: this.stroke,
            strokeWidth: this.strokeWidth,
            fill: this.fill,
            selectable: false,
            hoverCursor: "default",
        });

        if (this.item.isType(ShapeType.RECT.value) || this.item.isType(ShapeType.TRIANGLE.value)) {
            this.item.set({
                width: 0,
                height: 0,
            })
        } else if (this.item.isType(ShapeType.ELLIPSE.value)) {
            (this.item as fabric.Ellipse).set({
                rx: 0,
                ry: 0,
            })
        }

        this.rootStore.canvasStore.canvas.add(this.item);
    }

    private onMouseMove(e: MouseEventObject) {
        if (!this.isDrawingShapeMode() || !this.isDragMode) {
            return;
        }

        if (e.currentCursorPosition.x < e.startCursorPosition.x) {
            this.item.set({left: Math.abs(e.currentCursorPosition.x)});
        }

        if (e.currentCursorPosition.y < e.startCursorPosition.y) {
            this.item.set({top: Math.abs(e.currentCursorPosition.y)});
        }

        this.item.set({flipX: e.currentCursorPosition.x < e.startCursorPosition.x});
        this.item.set({flipY: e.currentCursorPosition.y < e.startCursorPosition.y});

        if (this.item.isType(ShapeType.RECT.value) || this.item.isType(ShapeType.TRIANGLE.value)) {
            this.item.set({
                width: Math.abs(e.startCursorPosition.x - e.currentCursorPosition.x),
                height: Math.abs(e.startCursorPosition.y - e.currentCursorPosition.y),
            });
        } else if (this.item.isType(ShapeType.ELLIPSE.value)) {
            (this.item as fabric.Ellipse).set({
                rx: Math.abs(e.startCursorPosition.x - e.currentCursorPosition.x) / 2,
                ry: Math.abs(e.startCursorPosition.y - e.currentCursorPosition.y) / 2,
            })
        }

        this.rootStore.canvasStore.canvas.renderAll();
    }

    private onMouseUp(e: MouseEventObject) {
        if (!this.isDrawingShapeMode()) {
            return;
        }

        this.isDragMode = false;
        if (this.item.isType(ShapeType.RECT.value) || this.item.isType(ShapeType.TRIANGLE.value)) {
            this.item.set({
                width: Math.max(MIN_OBJECT_SIZE, this.item.width || MIN_OBJECT_SIZE),
                height: Math.max(MIN_OBJECT_SIZE, this.item.height || MIN_OBJECT_SIZE),
            }).setCoords();
        } else if (this.item.isType(ShapeType.ELLIPSE.value)) {
            const circle = this.item as fabric.Ellipse;
            circle.set({
                rx: Math.max(MIN_OBJECT_SIZE / 2, circle.rx || MIN_OBJECT_SIZE / 2),
                ry: Math.max(MIN_OBJECT_SIZE / 2, circle.ry || MIN_OBJECT_SIZE / 2),
            }).setCoords();
        }

        const canvasStore = this.rootStore.canvasStore;
        canvasStore.setCanvasMode(ToolTypes.SELECT);
        canvasStore.canvas.setActiveObject(this.item);
        canvasStore.canvas.renderAll();
        console.log(canvasStore.canvasMode);
    }
}