import { makeAutoObservable } from "mobx";
import { BrushType } from "models/tools/Brush";
import { RootStore, Store } from "./rootStore";
import { fabric } from "fabric";
import { ObjectManagerStore } from "./objectManagerStore";
import { CanvasModeManager } from "./canvasStore";
import { ToolTypes } from "models/tools/ToolTypes";

const defaultStyles = {
    brushType: BrushType.PENCIL,
    stroke: "#000000",
    strokeWidth: 1,
}

interface PathStyles {
    stroke: string | undefined,
    strokeWidth: number | undefined,
}

export class BrushStore implements Store, CanvasModeManager {
    brushType = defaultStyles.brushType;
    stroke = defaultStyles.stroke;
    strokeWidth = defaultStyles.strokeWidth;
    item: fabric.Path | undefined;

    private readonly listeners: any;
    private readonly canvas: fabric.Canvas;
    private readonly objectManager: ObjectManagerStore;

    constructor(
        private readonly rootStore: RootStore,
    ) {
        makeAutoObservable(this);
        rootStore.canvasStore.registerCanvasModeManager(ToolTypes.BRUSH, this);
        this.canvas = rootStore.canvasStore.canvas;
        this.objectManager = rootStore.objectManagerStore;
        this.listeners = {
            updateObject: this.updateObject.bind(this),
        }
    }

    onInit() {
        this.addReactions();
    }

    onDestory() {
        this.removeReactions();
    }

    onSessionStart() {
        this.canvas.isDrawingMode = true;
        this.setBrushType(this.brushType);
    }

    onSessionEnd() {
        this.removeReactions();
        this.canvas.isDrawingMode = false;
    }

    setBrushType(brushType: BrushType) {
        this.brushType = brushType;
        this.setFreeDrawingBrush();
    }

    setStroke(stroke: string | undefined) {
        this.stroke = stroke || defaultStyles.stroke;
        this.item?.set("stroke", stroke);
        this.canvas.freeDrawingBrush.color = this.stroke;
        this.canvas.renderAll();
    }

    setStrokeWidth(strokeWidth: number | undefined) {
        this.strokeWidth = strokeWidth || defaultStyles.strokeWidth;
        this.item?.set("strokeWidth", strokeWidth);
        this.canvas.freeDrawingBrush.width = this.strokeWidth;
        this.canvas.renderAll();
    }

    private setFreeDrawingBrush() {
        this.canvas.freeDrawingBrush = this.rootStore.brushStore.brushType.getBrush(this.canvas);
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

    private setPathStyles(styles: PathStyles) {
        this.setStroke(styles.stroke);
        this.setStrokeWidth(styles.strokeWidth);
    }

    private updatePathStyles() {
        if (!this.item) {
            return;
        }

        const {
            stroke,
            strokeWidth,
        } = this.item;

        this.setPathStyles({
            stroke: stroke,
            strokeWidth: strokeWidth,
        })
    }

    private isBrush(object: fabric.Object | undefined) {
        return object?.isType("path");
    }

    private addReactions() {
        this.objectManager.subscribe(this.listeners.updateObject);
    }

    private removeReactions() {
        this.objectManager.unsubscribe(this.listeners.updateObject);
    }
}