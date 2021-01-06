import { MouseEventObject, MouseEventStore, MouseEventType } from "./mouseEventStore";
import { RootStore } from "./rootStore";
import { fabric } from "fabric";
import { ToolTypes } from "models/tools/ToolTypes";
import { ObjectEventStore, ObjectEventType } from "./objectEventStore";
import { IEvent } from "fabric/fabric-impl";
import { ObjectManagerStore } from "./objectManagerStore";
import { makeAutoObservable } from "mobx";

const defaultStyles = {
    FONT_SIZE: 30,
}

interface TextStyles {
    fontSize: number,
}

export class TextStore {
    private readonly objectManager: ObjectManagerStore;
    private readonly mouseEventStore: MouseEventStore;
    private readonly objectEventStore: ObjectEventStore;
    private readonly canvas: fabric.Canvas;

    fontSize = defaultStyles.FONT_SIZE;
    item: fabric.IText | undefined;

    constructor(private readonly rootStore: RootStore) {
        makeAutoObservable(this);
        this.objectManager = rootStore.objectManagerStore;
        this.mouseEventStore = rootStore.mouseEventStore;
        this.objectEventStore = rootStore.objectEventStore;
        this.canvas = rootStore.canvasStore.canvas;
        this.addEventListener();
    }

    setFontSize(fontSize: number) {
        this.fontSize = fontSize;
        if (this.item) {
            this.item.set({fontSize: fontSize});
            this.canvas.renderAll();
        }
    }

    private addEventListener() {
        this.mouseEventStore.subscribe(MouseEventType.MOUSE_UP, this.onMouseUp.bind(this));
        this.objectEventStore.subscribe(ObjectEventType.OBJECT_MODIFIED, this.onModified.bind(this));
        this.objectManager.subscribe(this.updateObject.bind(this));
    }

    private updateObject(object: fabric.Object | undefined) {
        if (object && this.isText(object)) {
            this.item = object as fabric.IText;
            this.updateTextStyles();
        } else {
            this.item = undefined;
        }
    }

    private updateTextStyles() {
        if (!this.item) {
            return;
        }

        const {
            fontSize,
        } = this.item;

        this.setTextStyles({
            fontSize: fontSize || defaultStyles.FONT_SIZE,
        })
    }

    private setTextStyles(styles: TextStyles) {
        this.setFontSize(styles.fontSize);
    }

    private onMouseUp(e: MouseEventObject) {
        if (!this.isTextTool()) {
            return;
        }

        this.item = new fabric.IText("텍스트를 입력해주세요", {
            top: e.currentCursorPosition.y,
            left: e.currentCursorPosition.x,
            fontSize: this.fontSize,
            lockUniScaling: true,
        });

        this.item.setControlVisible("mt", false);
        this.item.setControlVisible("mb", false);
        this.item.setControlVisible("ml", false);
        this.item.setControlVisible("mr", false);

        const canvasStore = this.rootStore.canvasStore;
        canvasStore.canvas.add(this.item);
        canvasStore.setCanvasMode(ToolTypes.SELECT);
        canvasStore.canvas.setActiveObject(this.item);

        this.item.selectAll();
        this.item.enterEditing();
    }

    private onModified(e: IEvent) {
        const { target } = e;
        if (!target || !this.isText(target)) {
            return;
        }

        const text = target as fabric.IText;
        const fontSize = parseInt(((text.fontSize || defaultStyles.FONT_SIZE) * (text.scaleX || 1)).toFixed(0), 10);
        text.set({
            scaleX: 1,
            scaleY: 1,
        });
        this.setFontSize(fontSize);
    }

    private isTextTool() {
        return this.rootStore.canvasStore.canvasMode === ToolTypes.TEXT;
    }

    private isText(object: fabric.Object) {
        return object.isType("i-text");
    }
}