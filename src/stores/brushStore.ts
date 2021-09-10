import { makeAutoObservable } from "mobx";
import { BrushType } from "models/tools/Brush";
import { RootStore, Store } from "./rootStore";
import { fabric } from "fabric";
import { SelectionEventStore } from "./selectionEventStore";
import { CanvasModeManager } from "./canvasStore";
import { ToolTypes } from "models/tools/ToolTypes";
import {ObjectStore} from "./objectStore";

const defaultStyles = {
    brushType: BrushType.PENCIL,
    stroke: "#000000",
    strokeWidth: 1,
}

export class BrushStore implements Store, CanvasModeManager {
    public brushType = defaultStyles.brushType;
    public stroke = defaultStyles.stroke;
    public strokeWidth = defaultStyles.strokeWidth;
    public item: fabric.Path | undefined;

    private readonly listeners: any;
    private readonly canvas: fabric.Canvas;
    private readonly selectionEventStore: SelectionEventStore;
    private readonly objectStore: ObjectStore;

    constructor(
        private readonly rootStore: RootStore,
    ) {
        makeAutoObservable(this);
        rootStore.canvasStore.registerCanvasModeManager(ToolTypes.BRUSH, this);
        this.canvas = rootStore.canvasStore.canvas;
        this.selectionEventStore = rootStore.selectionEventStore;
        this.objectStore = rootStore.objectStore;
        this.listeners = {
            updateObject: this.updateObject.bind(this),
        }
    }

    onInit() {
        this.addReactions();
    }

    onDestroy() {
        this.removeReactions();
    }

    onSessionStart() {
        this.canvas.isDrawingMode = true;
        this.setBrushType(this.brushType);
    }

    onSessionEnd() {
        this.canvas.isDrawingMode = false;
    }

    setBrushType(brushType: BrushType) {
        this.brushType = brushType;
        this.setFreeDrawingBrush();
    }

    updateStroke(stroke: string | undefined) {
        this.stroke = stroke || defaultStyles.stroke;
        this.canvas.freeDrawingBrush.color = this.stroke;
    }

    setStroke(stroke: string | undefined) {
        this.updateStroke(stroke);
        this.objectStore.setStroke(stroke);
    }

    updateStrokeWidth(strokeWidth: number | undefined) {
        this.strokeWidth = strokeWidth || defaultStyles.strokeWidth;
        this.canvas.freeDrawingBrush.width = this.strokeWidth;
    }

    setStrokeWidth(strokeWidth: number | undefined) {
        this.updateStrokeWidth(strokeWidth);
        this.objectStore.setStrokeWidth(strokeWidth);
    }

    private setFreeDrawingBrush() {
        this.canvas.freeDrawingBrush = this.brushType.getBrush(this.canvas);
        this.canvas.freeDrawingBrush.color = this.stroke;
        this.canvas.freeDrawingBrush.width = this.strokeWidth;
    }

    private updateObject(object: fabric.Object | undefined) {
        if (this.isBrush(object)) {
            this.item = object as fabric.Path;
            this.updatePathStyles();
        } else {
            this.item = undefined;
        }
    }

    private updatePathStyles() {
        if (!this.item) {
            return;
        }

        const {
            stroke,
            strokeWidth,
        } = this.item;

        this.updateStroke(stroke);
        this.updateStrokeWidth(strokeWidth);
    }

    private isBrush(object: fabric.Object | undefined) {
        return this.objectStore.isPath(object);
    }

    private addReactions() {
        this.selectionEventStore.subscribe(this.listeners.updateObject);
    }

    private removeReactions() {
        this.selectionEventStore.unsubscribe(this.listeners.updateObject);
    }
}