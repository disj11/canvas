import { makeAutoObservable } from "mobx";
import { ShapeType } from "models/tools/Shape";
import { ToolTypes } from "models/tools/ToolTypes";
import { MouseEventObject, MouseEventStore, MouseEventType } from "./mouseEventStore";
import { ObjectManagerStore } from "./objectManagerStore";
import { RootStore } from "./rootStore";

const defaultStyles = {
    shapeType: ShapeType.ELLIPSE,
    fill: undefined,
    strokeWidth: 3,
    stroke: "#000000",
}

interface ShapeStyles {
    fill: string | undefined;
    strokeWidth: number;
    stroke: string | undefined;
}

export class ShapeStore {
    private static readonly MIN_OBJECT_SIZE = 30;
    private readonly canvas: fabric.Canvas;
    private readonly mouseEventStore: MouseEventStore;
    private readonly objectManager: ObjectManagerStore;
    private isDragMode = false;

    item: fabric.Rect | fabric.Triangle | fabric.Ellipse | undefined;
    shapeType = defaultStyles.shapeType;
    fill: string | undefined = defaultStyles.fill;
    strokeWidth = defaultStyles.strokeWidth;
    stroke: string | undefined = defaultStyles.stroke;

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

    setFill(fill: string | undefined) {
        this.fill = fill;
        if (this.item) {
            this.item.set({ fill: fill });
            this.canvas.renderAll();
        }
    }

    setStroke(stroke: string | undefined) {
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
            fill: fill === undefined ? defaultStyles.fill : fill as string,
            stroke: stroke,
            strokeWidth: strokeWidth || defaultStyles.strokeWidth,
        })
    }

    private addEventListeners() {
        this.mouseEventStore.subscribe(MouseEventType.MOUSE_UP, this.onMouseUp.bind(this));
        this.mouseEventStore.subscribe(MouseEventType.MOUSE_DOWN, this.onMouseDown.bind(this));
        this.mouseEventStore.subscribe(MouseEventType.MOUSE_MOVE, this.onMouseMove.bind(this));
    }

    private isShapeTool() {
        return this.rootStore.canvasStore.canvasMode === ToolTypes.SHAPE;
    }

    private isShape(object: fabric.Object | undefined) {
        return object?.isType(ShapeType.ELLIPSE.value) || object?.isType(ShapeType.RECT.value) || object?.isType(ShapeType.TRIANGLE.value);
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