import { makeAutoObservable } from "mobx";
import { ShapeType } from "models/tools/Shape";
import { ToolTypes } from "models/tools/ToolTypes";
import { CanvasModeManager } from "./canvasStore";
import { MouseEventObject, MouseEventStore, MouseEventType } from "./mouseEventStore";
import { SelectionEventStore } from "./selectionEventStore";
import { RootStore, Store } from "./rootStore";
import {fabric} from "fabric";
import {ObjectStore} from "./objectStore";

const defaultStyles = {
    shapeType: ShapeType.ELLIPSE,
    fill: undefined,
    strokeWidth: 3,
    stroke: "#000000",
}

export class ShapeStore implements Store, CanvasModeManager {
    private static readonly MIN_OBJECT_SIZE = 30;
    private readonly canvas: fabric.Canvas;
    private readonly mouseEventStore: MouseEventStore;
    private readonly selectionEventStore: SelectionEventStore;
    private readonly objectStore: ObjectStore;
    private readonly listeners: any;
    private isDragMode = false;

    item: fabric.Rect | fabric.Triangle | fabric.Ellipse | undefined;
    fill: string | undefined = defaultStyles.fill;
    shapeType = defaultStyles.shapeType;
    strokeWidth = defaultStyles.strokeWidth;
    stroke: string | undefined = defaultStyles.stroke;

    constructor(private readonly rootStore: RootStore) {
        makeAutoObservable(this);
        rootStore.canvasStore.registerCanvasModeManager(ToolTypes.SHAPE, this);
        this.canvas = rootStore.canvasStore.canvas;
        this.mouseEventStore = rootStore.mouseEventStore;
        this.selectionEventStore = rootStore.selectionEventStore;
        this.objectStore = rootStore.objectStore;
        this.listeners = {
            onMouseUp: this.onMouseUp.bind(this),
            onMouseDown: this.onMouseDown.bind(this),
            onMouseMove: this.onMouseMove.bind(this),
            updateObject: this.updateObject.bind(this),
        }
    }

    onInit() {
        this.addEventListeners();
        this.addReactions();
    }

    onDestroy() {
        this.removeEventListener();
        this.removeReactions();
    }

    onSessionStart() {
        this.rootStore.canvasStore.setAllCursor("crosshair");
    }

    onSessionEnd() {
        //
    }

    setShapeType(shapeType: ShapeType) {
        this.shapeType = shapeType;
    }

    setFill(fill: string | undefined) {
        this.fill = fill;
        this.objectStore.setFill(fill);
    }

    setStroke(stroke: string | undefined) {
        this.stroke = stroke;
        this.objectStore.setStroke(stroke);
    }

    setStrokeWidth(strokeWidth: number) {
        this.strokeWidth = strokeWidth;
        this.objectStore.setStrokeWidth(strokeWidth);
    }

    private addReactions() {
        this.selectionEventStore.subscribe(this.listeners.updateObject);
    }

    private removeReactions() {
        this.selectionEventStore.unsubscribe(this.listeners.updateObject);
    }

    private updateObject(object: fabric.Object | undefined) {
        if (this.objectStore.isShape(object)) {
            this.item = object;
            this.updateShapeStyles();
        } else {
            this.item = undefined;
        }
    }

    private updateShapeStyles() {
        if (!this.item) {
            return;
        }

        const {
            stroke,
            strokeWidth,
            fill,
        } = this.item;

        this.fill = typeof fill === "string" ? fill : undefined;
        this.stroke = stroke;
        this.strokeWidth = strokeWidth || defaultStyles.strokeWidth;
    }

    private addEventListeners() {
        this.mouseEventStore.subscribe(MouseEventType.MOUSE_UP, this.listeners.onMouseUp);
        this.mouseEventStore.subscribe(MouseEventType.MOUSE_DOWN, this.listeners.onMouseDown);
        this.mouseEventStore.subscribe(MouseEventType.MOUSE_MOVE, this.listeners.onMouseMove);
    }

    private removeEventListener() {
        this.mouseEventStore.unsubscribe(MouseEventType.MOUSE_UP, this.listeners.onMouseUp);
        this.mouseEventStore.unsubscribe(MouseEventType.MOUSE_DOWN, this.listeners.onMouseDown);
        this.mouseEventStore.unsubscribe(MouseEventType.MOUSE_MOVE, this.listeners.onMouseMove);
    }

    private isShapeTool() {
        return this.rootStore.canvasStore.canvasMode === ToolTypes.SHAPE;
    }

    private onMouseDown(e: MouseEventObject) {
        if (!this.isShapeTool()) {
            return;
        }

        this.isDragMode = true;
        this.item = this.shapeType.getShape({
            left: e.startCursorPosition.x,
            top: e.startCursorPosition.y,
            stroke: this.stroke,
            strokeWidth: this.strokeWidth,
            fill: this.fill,
            selectable: false,
            hoverCursor: "default",
            strokeUniform: true,
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
        if (!this.isShapeTool() || !this.isDragMode || !this.item) {
            return;
        }

        if (e.currentCursorPosition.x < e.startCursorPosition.x) {
            this.item.set({ left: Math.abs(e.currentCursorPosition.x) });
        }

        if (e.currentCursorPosition.y < e.startCursorPosition.y) {
            this.item.set({ top: Math.abs(e.currentCursorPosition.y) });
        }

        this.item.set({ flipX: e.currentCursorPosition.x < e.startCursorPosition.x });
        this.item.set({ flipY: e.currentCursorPosition.y < e.startCursorPosition.y });

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
        if (!this.isShapeTool() || !this.item) {
            return;
        }

        this.isDragMode = false;
        if (this.item.isType(ShapeType.RECT.value) || this.item.isType(ShapeType.TRIANGLE.value)) {
            this.item.set({
                width: Math.max(ShapeStore.MIN_OBJECT_SIZE, this.item.width || ShapeStore.MIN_OBJECT_SIZE),
                height: Math.max(ShapeStore.MIN_OBJECT_SIZE, this.item.height || ShapeStore.MIN_OBJECT_SIZE),
            }).setCoords();
        } else if (this.item.isType(ShapeType.ELLIPSE.value)) {
            const circle = this.item as fabric.Ellipse;
            circle.set({
                rx: Math.max(ShapeStore.MIN_OBJECT_SIZE / 2, circle.rx || ShapeStore.MIN_OBJECT_SIZE / 2),
                ry: Math.max(ShapeStore.MIN_OBJECT_SIZE / 2, circle.ry || ShapeStore.MIN_OBJECT_SIZE / 2),
            }).setCoords();
        }

        const canvasStore = this.rootStore.canvasStore;
        canvasStore.setCanvasMode(ToolTypes.SELECT);
        canvasStore.canvas.setActiveObject(this.item);
        canvasStore.canvas.renderAll();

        this.item = undefined;
    }
}