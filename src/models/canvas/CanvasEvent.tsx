import { CanvasStore } from "../../stores/CanvasStore";
import { ToolTypes } from "./ToolTypes";
import { IEvent } from "fabric/fabric-impl";
import { CanvasEventHandler, CanvasEventObject } from "./CanvasEventModel";
import { ShapeCanvasMouseDownEvent, ShapeCanvasMouseMoveEvent, ShapeCanvasMouseUpEvent } from "./ShapeCanvasEvent";
import { TextCanvasMouseDownEvent, TextCanvasMouseMoveEvent, TextCanvasMouseUpEvent } from "./TextCanvasEvent";
import { RootStore } from "stores/RootStore";

export class CanvasEvent {
    protected static MOUSE_UP = "mouse:up";
    protected static MOUSE_DOWN = "mouse:down";
    protected static MOUSE_MOVE = "mouse:move";
    protected static SELECTION_CLEARED = "selection:cleared";
    protected static SELECTION_CREATED = "selection:created";
    protected static SELECTION_UPDATED = "selection:updated";

    private shareObject: CanvasEventObject = {
        e: {} as IEvent,
        rootStore: this.rootStore,
        startCursorPosition: { x: 0, y: 0 },
        currentCursorPosition: { x: 0, y: 0 },
        isDown: false
    };

    constructor(private readonly rootStore: RootStore) {
    }

    public init() {
        const canvas = this.rootStore.canvasStore.canvas;
        canvas.on(CanvasEvent.MOUSE_UP, this.handleMouseUp.bind(this));
        canvas.on(CanvasEvent.MOUSE_MOVE, this.handleMouseMove.bind(this));
        canvas.on(CanvasEvent.MOUSE_DOWN, this.handleMouseDown.bind(this));
        canvas.on(CanvasEvent.SELECTION_CREATED, this.handleSelectObject.bind(this));
        canvas.on(CanvasEvent.SELECTION_UPDATED, this.handleSelectObject.bind(this));
        canvas.on(CanvasEvent.SELECTION_CLEARED, this.handleDeSelectObject.bind(this));
    }

    private handleSelectObject() {
        const canvas = this.rootStore.canvasStore.canvas;
        this.rootStore.canvasStore.activeObject = canvas.getActiveObject();
        this.rootStore.canvasStore.activeObjects = canvas.getActiveObjects();
    }

    private handleDeSelectObject() {
        this.rootStore.canvasStore.activeObject = undefined;
        this.rootStore.canvasStore.activeObjects = [];
    }

    private handleMouseUp(e: IEvent) {
        this.shareObject.e = e;
        this.shareObject.isDown = false;
        CanvasMouseUpEventFactory.getInstance(this.rootStore.canvasStore)?.handle(this.shareObject);
    }

    private handleMouseDown(e: IEvent) {
        this.shareObject.e = e;
        this.shareObject.isDown = true;
        this.shareObject.startCursorPosition = { ...this.getCursorPosition(e) };
        this.shareObject.currentCursorPosition = { ...this.getCursorPosition(e) };
        CanvasMouseDownEventFactory.getInstance(this.rootStore.canvasStore)?.handle(this.shareObject);
    };

    private handleMouseMove(e: IEvent) {
        this.shareObject.e = e;
        this.shareObject.currentCursorPosition = { ...this.getCursorPosition(e) };
        if (this.shareObject.isDown) {
            CanvasMouseMoveEventFactory.getInstance(this.rootStore.canvasStore)?.handle(this.shareObject);
        }
    };

    private getCursorPosition(e: IEvent) {
        return this.rootStore.canvasStore.canvas.getPointer(e.e);
    }
}

class CanvasMouseUpEventFactory {
    public static getInstance(canvasStore: CanvasStore): CanvasEventHandler<CanvasEventObject> | null {
        switch (canvasStore.selectedTool) {
            case ToolTypes.SHAPE:
                return new ShapeCanvasMouseUpEvent();
            case ToolTypes.TEXT:
                return new TextCanvasMouseUpEvent();
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
            case ToolTypes.TEXT:
                return new TextCanvasMouseDownEvent();
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
            case ToolTypes.TEXT:
                return new TextCanvasMouseMoveEvent();
            default:
                return null;
        }
    }
}


