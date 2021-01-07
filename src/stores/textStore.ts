import { MouseEventObject, MouseEventStore, MouseEventType } from "./mouseEventStore";
import { RootStore } from "./rootStore";
import { fabric } from "fabric";
import { ToolTypes } from "models/tools/ToolTypes";
import { ObjectEventStore, ObjectEventType } from "./objectEventStore";
import { IEvent } from "fabric/fabric-impl";
import { ObjectManagerStore } from "./objectManagerStore";
import { makeAutoObservable } from "mobx";
import { FontFaces, fontSizes } from "models/tools/Text";
import WebFont from "webfontloader";

const defaultStyles = {
    FONT_SIZE: fontSizes[fontSizes.length / 2],
    FILL: "#000000",
    FONT_FAMILY: FontFaces.TIMES_NEW_ROMAN.value,
}

interface TextStyles {
    fontSize: number,
    fill: string,
    fontFamily: string,
}

export class TextStore {
    private readonly objectManager: ObjectManagerStore;
    private readonly mouseEventStore: MouseEventStore;
    private readonly objectEventStore: ObjectEventStore;
    private readonly canvas: fabric.Canvas;

    fontSize = defaultStyles.FONT_SIZE;
    fill = defaultStyles.FILL;
    fontFamily = defaultStyles.FONT_FAMILY;
    item: fabric.IText | undefined;

    constructor(private readonly rootStore: RootStore) {
        makeAutoObservable(this);
        this.loadFont();
        this.objectManager = rootStore.objectManagerStore;
        this.mouseEventStore = rootStore.mouseEventStore;
        this.objectEventStore = rootStore.objectEventStore;
        this.canvas = rootStore.canvasStore.canvas;
        this.addEventListener();
        this.addFontAutoRender();
    }

    setFontSize(fontSize: number) {
        this.fontSize = fontSize;
        if (this.item) {
            this.item.set({ fontSize: fontSize });
            this.canvas.renderAll();
        }
    }

    setFill(fill: string) {
        this.fill = fill;
        if (this.item) {
            this.item.set({ fill: fill });
            this.canvas.renderAll();
        }
    }

    setFontFamily(fontFamily: string) {
        this.fontFamily = fontFamily;
        if (this.item) {
            this.item.set({ fontFamily: fontFamily });
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
            fill,
            fontFamily,
        } = this.item;

        this.setTextStyles({
            fontSize: fontSize || defaultStyles.FONT_SIZE,
            fill: !fill ? defaultStyles.FILL : fill as string,
            fontFamily: fontFamily || defaultStyles.FONT_FAMILY,
        })
    }

    private setTextStyles(styles: TextStyles) {
        this.setFontSize(styles.fontSize);
        this.setFill(styles.fill);
        this.setFontFamily(styles.fontFamily);
    }

    private onMouseUp(e: MouseEventObject) {
        if (!this.isTextTool()) {
            return;
        }

        this.item = new fabric.IText("텍스트를 입력해주세요", {
            top: e.currentCursorPosition.y,
            left: e.currentCursorPosition.x,
            fontFamily: this.fontFamily,
            fontSize: this.fontSize,
            lockUniScaling: true,
            fill: this.fill,
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

    private loadFont() {
        WebFont.load({
            google: {
                families: FontFaces.getGoogleFonts().map(font => font.value),
            },
        })
    }

    private addFontAutoRender() {
        setInterval(() => {
            this.canvas.getActiveObjects()
                .filter(object => this.isText(object))
                .forEach((object) => {
                    const textObject = object as fabric.IText;
                    textObject.initDimensions();
                    textObject.dirty = true;
                });
            fabric.util.clearFabricFontCache();
            this.canvas.renderAll();
        }, 500);
    }
}