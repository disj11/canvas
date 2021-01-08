import { MouseEventObject, MouseEventStore, MouseEventType } from "./mouseEventStore";
import { RootStore, Store } from "./rootStore";
import { fabric } from "fabric";
import { ToolTypes } from "models/tools/ToolTypes";
import { ObjectEventStore, ObjectEventType } from "./objectEventStore";
import { IEvent } from "fabric/fabric-impl";
import { ObjectManagerStore } from "./objectManagerStore";
import { makeAutoObservable } from "mobx";
import { FontFaces, fontSizes, FontStyle, FontWeight, TextAlign } from "models/tools/Text";
import WebFont from "webfontloader";
import { CanvasModeManager } from "./canvasStore";

const defaultStyles = {
    FONT_SIZE: fontSizes[fontSizes.length / 2],
    FILL: "#000000",
    FONT_FAMILY: FontFaces.TIMES_NEW_ROMAN.value,
    TEXT_ALIGN: TextAlign.LEFT,
    FONT_STYLE: FontStyle.NORMAL,
    FONT_WEIGHT: FontWeight.NORMAL,
    UNDERLINE: false,
}

interface TextStyles {
    fontSize: number,
    fill: string,
    fontFamily: string,
    textAlign: string,
    fontStyle: string,
    fontWeight: string | number,
    underline: boolean,
}

export class TextStore implements Store, CanvasModeManager {
    private readonly objectManager: ObjectManagerStore;
    private readonly mouseEventStore: MouseEventStore;
    private readonly objectEventStore: ObjectEventStore;
    private readonly canvas: fabric.Canvas;
    private readonly listeners: any;
    private fontStyle = defaultStyles.FONT_STYLE;
    private fontWeight = defaultStyles.FONT_WEIGHT;
    private autoRenderId: NodeJS.Timeout | undefined;

    fontSize = defaultStyles.FONT_SIZE;
    fill = defaultStyles.FILL;
    fontFamily = defaultStyles.FONT_FAMILY;
    textAlign = defaultStyles.TEXT_ALIGN;
    underline = defaultStyles.UNDERLINE;
    item: fabric.IText | undefined;

    constructor(private readonly rootStore: RootStore) {
        makeAutoObservable(this);
        rootStore.canvasStore.registerCanvasModeManager(ToolTypes.TEXT, this);
        this.loadFont();
        this.objectManager = rootStore.objectManagerStore;
        this.mouseEventStore = rootStore.mouseEventStore;
        this.objectEventStore = rootStore.objectEventStore;
        this.canvas = rootStore.canvasStore.canvas;
        this.listeners = {
            onMouseUp: this.onMouseUp.bind(this),
            onModified: this.onModified.bind(this),
            updateObject: this.updateObject.bind(this),
        }
    }

    onInit() {
        this.addEventListener();
        this.addFontAutoRender();
    }

    onDestory() {
        this.removeEventListener();
        this.removeFontAutoRender();
    }

    onSessionStart() {
        this.rootStore.canvasStore.setAllCursor("text");
    }

    onSessionEnd() {
        //
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

    setTextAlign(textAlign: string) {
        this.textAlign = textAlign;
        if (this.item) {
            this.item.set({ textAlign: textAlign });
            this.canvas.renderAll();
        }
    }

    setUnderline(underline: boolean) {
        this.underline = underline;
        if (this.item) {
            this.item.set({ underline: underline });
            this.canvas.renderAll();
        }
    }

    setBold(bold: boolean) {
        const changedValue = bold ? FontWeight.BOLD : FontWeight.NORMAL;
        this.fontWeight = changedValue;
        if (this.item) {
            this.item.set({ fontWeight: changedValue });
            this.canvas.renderAll();
        }
    }

    isBold() {
        return this.fontWeight === FontWeight.BOLD;
    }

    setItalic(italic: boolean) {
        const changedValue = italic ? FontStyle.ITALIC : FontStyle.NORMAL;
        this.fontStyle = changedValue;
        if (this.item) {
            this.item.set({ fontStyle: changedValue as any });
            this.canvas.renderAll();
        }
    }

    isItalic() {
        return this.fontStyle === FontStyle.ITALIC;
    }

    private addEventListener() {
        this.mouseEventStore.subscribe(MouseEventType.MOUSE_UP, this.listeners.onMouseUp);
        this.objectEventStore.subscribe(ObjectEventType.OBJECT_MODIFIED, this.listeners.onModified);
        this.objectManager.subscribe(this.listeners.updateObject);
    }

    private removeEventListener() {
        this.mouseEventStore.unsubscribe(MouseEventType.MOUSE_UP, this.listeners.onMouseUp);
        this.objectEventStore.unsubscribe(ObjectEventType.OBJECT_MODIFIED, this.listeners.onModified);
        this.objectManager.unsubscribe(this.listeners.updateObject);
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
            textAlign,
            fontStyle,
            fontWeight,
            underline,
        } = this.item;

        this.setTextStyles({
            fontSize: fontSize || defaultStyles.FONT_SIZE,
            fill: !fill ? defaultStyles.FILL : fill as string,
            fontFamily: fontFamily || defaultStyles.FONT_FAMILY,
            textAlign: textAlign || defaultStyles.TEXT_ALIGN,
            fontStyle: fontStyle || defaultStyles.FONT_STYLE,
            fontWeight: fontWeight || defaultStyles.FONT_WEIGHT,
            underline: !!underline,
        })
    }

    private setTextStyles(styles: TextStyles) {
        this.setFontSize(styles.fontSize);
        this.setFill(styles.fill);
        this.setFontFamily(styles.fontFamily);
        this.setTextAlign(styles.textAlign);
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
            textAlign: this.textAlign,
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
        this.autoRenderId = setInterval(() => {
            this.canvas.getActiveObjects()
                .filter(object => this.isText(object))
                .forEach((object) => {
                    const textObject = object as fabric.IText;
                    textObject.initDimensions();
                    textObject.dirty = true;
                });
            fabric.util.clearFabricFontCache();
            this.canvas.renderAll();
        }, 1000);
    }

    private removeFontAutoRender() {
        if (this.autoRenderId) {
            clearInterval(this.autoRenderId);
        }
    }
}