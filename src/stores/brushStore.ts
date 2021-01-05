import { makeAutoObservable } from "mobx";
import { BrushType } from "models/tools/Brush";
import { RootStore } from "./rootStore";
import { fabric } from "fabric";
import { ObjectManagerStore } from "./objectManagerStore";

const defaultStyles = {
    brushType: BrushType.PENCIL,
    stroke: "#000000",
    strokeWidth: 1,
}

interface PathStyles {
    stroke: string | undefined,
    strokeWidth: number | undefined,
}

export class BrushStore {
    brushType = defaultStyles.brushType;
    stroke = defaultStyles.stroke;
    strokeWidth = defaultStyles.strokeWidth;

    private readonly canvas: fabric.Canvas;
    private readonly objectManager: ObjectManagerStore;
    private item: fabric.Path | undefined;

    constructor(
        private readonly rootStore: RootStore,
    ) {
        makeAutoObservable(this);
        this.canvas = rootStore.canvasStore.canvas;
        this.objectManager = rootStore.objectManagerStore;
        this.addReactions();
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

    private addReactions() {
        this.objectManager.subscribe(this.updateObject.bind(this));
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
}