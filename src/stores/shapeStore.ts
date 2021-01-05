import { makeAutoObservable } from "mobx";
import { CommonColor } from "models/color/CommonColor";
import { ShapeType } from "models/tools/Shape";
import { ToolTypes } from "models/tools/ToolTypes";
import { MouseEventObject, MouseEventStore, MouseEventType } from "./mouseEventStore";
import { ObjectManagerStore } from "./objectManagerStore";
import { RootStore } from "./rootStore";

const defaultStyles = {
    shapeType: ShapeType.RECT,
    fill: CommonColor.PRIMARY,
    strokeWidth: 3,
    stroke: "#000000",
}

interface ShapeStyles {
    fill: string;
    strokeWidth: number;
    stroke: string;
}

const MIN_OBJECT_SIZE = 10;

export class ShapeStore {
    private readonly canvas: fabric.Canvas;
    private readonly mouseEventStore: MouseEventStore;
    private readonly objectManager: ObjectManagerStore;
    private isDragMode = false;
    private item: fabric.Rect | fabric.Triangle | fabric.Ellipse | undefined;

    shapeType = defaultStyles.shapeType;
    fill = defaultStyles.fill;
    strokeWidth = defaultStyles.strokeWidth;
    stroke = defaultStyles.stroke;

    constructor(private readonly rootStore: RootStore) {
        makeAutoObservable(this);
        this.canvas = rootStore.canvasStore.canvas;
        this.mouseEventStore = rootStore.mouseEventStore;
        this.objectManager = rootStore.objectManagerStore;
        this.addEventListeners();
        this.addReactions();
    }

    setShapeType(shapeType: ShapeType) {
        this.shapeType = shapeType;
    }

    setFill(fill: string) {
        this.fill = fill;
        if (this.item) {
            this.item.set({ fill: fill });
            this.canvas.renderAll();
        }
    }

    setStroke(stroke: string) {
        this.stroke = stroke;
        if (this.item) {
            this.item.set({ stroke: stroke });
            this.canvas.renderAll();
        }
    }

    setStrokeWidth(strokeWidth: number) {
        this.strokeWidth = strokeWidth;
        if (this.item) {
            this.item.set({ strokeWidth: strokeWidth });
            this.canvas.renderAll();
        }
    }

    private addReactions() {
        this.objectManager.subscribe(this.updateObject.bind(this));
    }

    private updateObject(object: fabric.Object | undefined) {
        if (this.isShape(object)) {
            this.item = object;
            this.updateShapeStyles();
        } else {
            this.item = undefined;
        }
    }

    private setShapeStyles(styles: ShapeStyles) {
        this.setFill(styles.fill);
        this.setStroke(styles.stroke);
        this.setStrokeWidth(styles.strokeWidth);
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

        this.setShapeStyles({
            fill: !fill ? defaultStyles.fill : fill as string,
            stroke: stroke || defaultStyles.stroke,
            strokeWidth: strokeWidth || defaultStyles.strokeWidth,
        })
    }

    private addEventListeners() {
        this.mouseEventStore.subscribe(MouseEventType.MOUSE_UP, this.onMouseUp.bind(this));
        this.mouseEventStore.subscribe(MouseEventType.MOUSE_DOWN, this.onMouseDown.bind(this));
        this.mouseEventStore.subscribe(MouseEventType.MOUSE_MOVE, this.onMouseMove.bind(this));
    }

    private isDrawingShapeMode() {
        return this.rootStore.canvasStore.canvasMode === ToolTypes.SHAPE;
    }

    private isShape(object: fabric.Object | undefined) {
        return object?.isType(ShapeType.ELLIPSE.value) || object?.isType(ShapeType.RECT.value) || object?.isType(ShapeType.TRIANGLE.value);
    }

    private onMouseDown(e: MouseEventObject) {
        if (!this.isDrawingShapeMode()) {
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
        if (!this.isDrawingShapeMode() || !this.isDragMode || !this.item) {
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
        if (!this.isDrawingShapeMode() || !this.item) {
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

        this.item = undefined;
    }
}