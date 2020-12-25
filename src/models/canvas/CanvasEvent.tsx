import {CanvasStore} from "../../stores/CanvasStore";
import {ToolTypes} from "./ToolTypes";
import {IEvent} from "fabric/fabric-impl";
import {fabric} from "fabric";

const MIN_OBJECT_SIZE = 10;

interface CanvasEventObject {
    e: IEvent,
    canvasStore: CanvasStore,
    startCursorPosition: {x: number, y: number}
    currentCursorPosition: {x: number, y: number}
    isDown: boolean,
}

interface ShapeCanvasEvent extends CanvasEventObject {
    object: fabric.Object,
}

export class CanvasEvent {
    protected static MOUSE_UP = "mouse:up";
    protected static MOUSE_DOWN = "mouse:down";
    protected static MOUSE_MOVE = "mouse:move";
    protected static SELECTION_CLEARED = "selection:cleared";
    protected static SELECTION_CREATED = "selection:created";
    protected static SELECTION_UPDATED = "selection:updated";

    private shareObject: CanvasEventObject = {
        e: {} as IEvent,
        canvasStore: this.canvasStore,
        startCursorPosition: {x: 0, y: 0},
        currentCursorPosition: {x: 0, y: 0},
        isDown: false
    };

    constructor(private readonly canvasStore: CanvasStore) {
    }

    public init() {
        const canvas = this.canvasStore.canvas;
        canvas.on(CanvasEvent.MOUSE_UP, this.handleMouseUp.bind(this));
        canvas.on(CanvasEvent.MOUSE_MOVE, this.handleMouseMove.bind(this));
        canvas.on(CanvasEvent.MOUSE_DOWN, this.handleMouseDown.bind(this));
        canvas.on(CanvasEvent.SELECTION_CREATED, this.handleSelectObject.bind(this));
        canvas.on(CanvasEvent.SELECTION_UPDATED, this.handleSelectObject.bind(this));
        canvas.on(CanvasEvent.SELECTION_CLEARED, this.handleDeSelectObject.bind(this));
    }

    private handleSelectObject() {
        const canvas = this.canvasStore.canvas;
        this.canvasStore.activeObject = canvas.getActiveObject();
        this.canvasStore.activeObjects = canvas.getActiveObjects();
    }

    private handleDeSelectObject() {
        this.canvasStore.activeObject = undefined;
        this.canvasStore.activeObjects = [];
    }

    private handleMouseUp(e: IEvent) {
        this.shareObject.e = e;
        this.shareObject.isDown = false;
        CanvasMouseUpEventFactory.getInstance(this.canvasStore)?.handle(this.shareObject);
    }

    private handleMouseDown(e: IEvent) {
        this.shareObject.e = e;
        this.shareObject.isDown = true;
        this.shareObject.startCursorPosition = {...this.getCursorPosition(e)};
        this.shareObject.currentCursorPosition = {...this.getCursorPosition(e)};
        CanvasMouseDownEventFactory.getInstance(this.canvasStore)?.handle(this.shareObject);
    };

    private handleMouseMove(e: IEvent) {
        this.shareObject.e = e;
        this.shareObject.currentCursorPosition = {...this.getCursorPosition(e)};
        if (this.shareObject.isDown) {
            CanvasMouseMoveEventFactory.getInstance(this.canvasStore)?.handle(this.shareObject);
        }
    };

    private getCursorPosition(e: IEvent) {
        return this.canvasStore.canvas.getPointer(e.e);
    }
}

interface CanvasEventHandler<T extends CanvasEventObject> {
    handle(e: T): void;
}

class CanvasMouseUpEventFactory {
    public static getInstance(canvasStore: CanvasStore): CanvasEventHandler<CanvasEventObject> | null {
        switch (canvasStore.selectedTool) {
            case ToolTypes.SHAPE:
                return new ShapeCanvasMouseUpEvent();
            default:
                return null;
        }
    }
}

class CanvasMouseDownEventFactory {
    public static getInstance(canvasStore: CanvasStore): CanvasEventHandler<CanvasEventObject> | null {
        switch (canvasStore.selectedTool) {
            case ToolTypes.SHAPE:
                return new ShapeCanvasMouseDownEvent();
            default:
                return null;
        }
    }
}

class CanvasMouseMoveEventFactory {
    public static getInstance(canvasStore: CanvasStore): CanvasEventHandler<CanvasEventObject> | null {
        switch (canvasStore.selectedTool) {
            case ToolTypes.SHAPE:
                return new ShapeCanvasMouseMoveEvent();
            default:
                return null;
        }
    }
}

class ShapeCanvasMouseUpEvent implements CanvasEventHandler<ShapeCanvasEvent> {
    handle(e: ShapeCanvasEvent): void {
        if (e.object.isType("rect") || e.object.isType("triangle")) {
            e.object.set({
                width: Math.max(MIN_OBJECT_SIZE, e.object.width || MIN_OBJECT_SIZE),
                height: Math.max(MIN_OBJECT_SIZE, e.object.height || MIN_OBJECT_SIZE),
            }).setCoords();
        } else if (e.object.isType("circle")) {
            const circle = e.object as fabric.Circle;
            circle.set("radius", Math.max(MIN_OBJECT_SIZE, circle.radius || MIN_OBJECT_SIZE))
                .setCoords();
        }
        e.canvasStore.canvas.renderAll();
    }
}

class ShapeCanvasMouseDownEvent implements CanvasEventHandler<ShapeCanvasEvent> {
    handle(e: ShapeCanvasEvent): void {
        e.object = e.canvasStore.shapeType.getShape({
            left: e.startCursorPosition.x,
            top: e.startCursorPosition.y,
            hasBorder: true,
            stroke: "#000",
            strokeWidth: 3,
            fill:"transparent",
            selectable: false,
            hoverCursor: "default",
        });

        if (e.object.isType("rect") || e.object.isType("triangle")) {
            e.object.set({
                width: 0,
                height: 0,
            })
        } else if (e.object.isType("circle")) {
            (e.object as fabric.Circle).set("radius", 0);
        }

        e.canvasStore.canvas.add(e.object);
    }
}

class ShapeCanvasMouseMoveEvent implements CanvasEventHandler<ShapeCanvasEvent> {
    handle(e: ShapeCanvasEvent): void {
        if(e.currentCursorPosition.x < e.startCursorPosition.x){
            e.object.set("left", Math.abs(e.currentCursorPosition.x));
        }

        if(e.currentCursorPosition.y < e.startCursorPosition.y){
            e.object.set("top", Math.abs(e.currentCursorPosition.y));
        }

        if (e.object.isType("rect") || e.object.isType("triangle")) {
            e.object.set({
                width: Math.abs(e.startCursorPosition.x - e.currentCursorPosition.x),
                height: Math.abs(e.startCursorPosition.y - e.currentCursorPosition.y),
            });
        } else if (e.object.isType("circle")) {
            (e.object as fabric.Circle).set("radius", Math.abs(e.startCursorPosition.x - e.currentCursorPosition.x));
        }

        e.canvasStore.canvas.renderAll();
    }
}

