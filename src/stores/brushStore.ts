import { makeAutoObservable } from "mobx";
import { BrushType } from "models/tools/Brush";
import { RootStore } from "./rootStore";
import { fabric } from "fabric";
import { ObjectManagerStore } from "./objectManagerStore";

const defaultStyles = {
    brushType: BrushType.PENCIL,
    color: "#000000",
    strokeWidth: 1,
}

interface PathStyles {
    color: string | undefined,
    strokeWidth: number | undefined,
}

export class BrushStore {
    brushType = defaultStyles.brushType;
    color = defaultStyles.color;
    strokeWidth = defaultStyles.strokeWidth;

    private readonly canvas: fabric.Canvas;
    private readonly objectManager: ObjectManagerStore;
    private item: fabric.Path;

    constructor(
        private readonly rootStore: RootStore,
    ) {
        makeAutoObservable(this);
        this.canvas = rootStore.canvasStore.canvas;
        this.objectManager = rootStore.objectManagerStore;
        this.item = new fabric.Path();
        this.addReactions();
    }

    setBrushType(brushType: BrushType) {
        this.brushType = brushType;
        this.setFreeDrawingBrush();
    }

    setColor(color: string | undefined) {
        this.color = color || defaultStyles.color;
        this.item.set("stroke", color);
        this.canvas.freeDrawingBrush.color = this.color;
        this.canvas.renderAll();
    }

    setStrokeWidth(strokeWidth: number | undefined) {
        this.strokeWidth = strokeWidth || defaultStyles.strokeWidth;
        this.item.set("strokeWidth", strokeWidth);
        this.canvas.freeDrawingBrush.width = this.strokeWidth;
        this.canvas.renderAll();
    }

    private setFreeDrawingBrush() {
        this.canvas.freeDrawingBrush = this.rootStore.brushStore.brushType.getBrush(this.canvas);
        this.canvas.freeDrawingBrush.color = this.color;
        this.canvas.freeDrawingBrush.width = this.strokeWidth;
    }

    private addReactions() {
        this.objectManager.subscribe(this.updateObject.bind(this));
    }

    private updateObject(object: fabric.Object | undefined) {
        this.item = !object ? new fabric.Path() : object as fabric.Path;
        this.updatePathStyles();
    }

    private setPathStyles(styles: PathStyles) {
        this.setColor(styles.color);
        this.setStrokeWidth(styles.strokeWidth);
    }

    private updatePathStyles() {
        const {
            stroke,
            strokeWidth,
        } = this.item;

        this.setPathStyles({
            color: stroke,
            strokeWidth: strokeWidth,
        })
    }

    private createItem() {
        this.item = new fabric.Path();
        this.updatePathStyles();
    }
}