import { makeAutoObservable } from "mobx";
import { ToolTypes } from "models/tools/ToolTypes";
import { RootStore, Store } from "./rootStore";
import {fabric} from "fabric";

const defaultStyles = {
    width: 500,
    height: 500,
    backgroundColor: "#ffffff",
}

export interface CanvasModeManager {
    onSessionStart: () => void;
    onSessionEnd: () => void;
}

export class CanvasStore implements Store {
    private readonly canvasModeManagers: Map<ToolTypes, CanvasModeManager> = new Map();

    width = defaultStyles.width;
    height = defaultStyles.height;
    backgroundColor = defaultStyles.backgroundColor;
    canvasMode = ToolTypes.BRUSH;

    constructor(
        private readonly rootStore: RootStore,
        readonly canvas: fabric.Canvas,
    ) {
        makeAutoObservable(this);
    }

    onInit() {
        this.canvas.setWidth(this.width);
        this.canvas.setHeight(this.height);
        this.canvas.setBackgroundColor(this.backgroundColor, () => {});
        this.setCanvasMode(this.canvasMode);
    }

    onDestroy() {
        this.canvas.dispose();
    }

    registerCanvasModeManager(mode: ToolTypes, manager: CanvasModeManager) {
        this.canvasModeManagers.set(mode, manager);
    }

    setCanvasMode(mode: ToolTypes) {
        const previousMode = this.canvasMode;
        this.canvasMode = mode;

        this.canvas.discardActiveObject().renderAll();
        this.setAllCursor("default");
        this.setSelectable(false)

        this.canvasModeManagers.get(previousMode)?.onSessionEnd();
        this.canvasModeManagers.get(mode)?.onSessionStart();
    }

    setSelectable(selectable: boolean) {
        this.canvas.selection = selectable;
        this.canvas.getObjects().forEach(obj => {
            obj.selectable = selectable;
        });
    }

    setDefaultCursor(cursor: string) {
        this.canvas.defaultCursor = cursor;
    }

    setHoverCursor(cursor: string) {
        this.canvas.getObjects().forEach(obj => {
            obj.hoverCursor = cursor;
        });
    }

    setAllCursor(cursor: string) {
        this.setDefaultCursor(cursor);
        this.setHoverCursor(cursor);
    }
}