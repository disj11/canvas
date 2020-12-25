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
        this.canvasStore.canvas.on(CanvasEvent.MOUSE_UP, this.handleMouseUp.bind(this));
        this.canvasStore.canvas.on(CanvasEvent.MOUSE_MOVE, this.handleMouseMove.bind(this));
        this.canvasStore.canvas.on(CanvasEvent.MOUSE_DOWN, this.handleMouseDown.bind(this));
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
        e.object.set({
            width: Math.max(MIN_OBJECT_SIZE, e.object.width || MIN_OBJECT_SIZE),
            height: Math.max(MIN_OBJECT_SIZE, e.object.height || MIN_OBJECT_SIZE),
        }).setCoords();
        e.canvasStore.canvas.renderAll();
    }
}

class ShapeCanvasMouseDownEvent implements CanvasEventHandler<ShapeCanvasEvent> {
    handle(e: ShapeCanvasEvent): void {
        e.object = new fabric.Rect({
            left: e.startCursorPosition.x,
            top: e.startCursorPosition.y,
            width: 0,
            height: 0,
            selectable: false,
            hoverCursor: "default",
        });
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

        e.object.set({
            width: Math.abs(e.startCursorPosition.x - e.currentCursorPosition.x),
            height: Math.abs(e.startCursorPosition.y - e.currentCursorPosition.y),
        });

        e.canvasStore.canvas.renderAll();
    }
}

