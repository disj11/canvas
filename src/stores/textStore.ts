import {MouseEventObject, MouseEventStore, MouseEventType} from "./mouseEventStore";
import {RootStore, Store} from "./rootStore";
import {fabric} from "fabric";
import {ToolTypes} from "models/tools/ToolTypes";
import {ObjectEventStore, ObjectEventType} from "./objectEventStore";
import {IEvent} from "fabric/fabric-impl";
import {SelectionEventStore} from "./selectionEventStore";
import {makeAutoObservable} from "mobx";
import {FontFaces, fontSizes, FontStyle, FontWeight, TextAlign} from "models/tools/Text";
import WebFont from "webfontloader";
import {CanvasModeManager} from "./canvasStore";
import {ObjectStore} from "./objectStore";

const defaultStyles = {
    FONT_SIZE: fontSizes[fontSizes.length / 2],
    FILL: "#000000",
    FONT_FAMILY: FontFaces.TIMES_NEW_ROMAN.value,
    TEXT_ALIGN: TextAlign.LEFT,
    FONT_STYLE: FontStyle.NORMAL,
    FONT_WEIGHT: FontWeight.NORMAL,
    UNDERLINE: false,
}

export class TextStore implements Store, CanvasModeManager {
    private readonly selectionEventStore: SelectionEventStore;
    private readonly mouseEventStore: MouseEventStore;
    private readonly objectEventStore: ObjectEventStore;
    private readonly objectStore: ObjectStore;
    private readonly canvas: fabric.Canvas;
    private readonly listeners: any;
    private fontStyle = defaultStyles.FONT_STYLE;
    private fontWeight: string = defaultStyles.FONT_WEIGHT;
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
        this.selectionEventStore = rootStore.selectionEventStore;
        this.mouseEventStore = rootStore.mouseEventStore;
        this.objectEventStore = rootStore.objectEventStore;
        this.objectStore = rootStore.objectStore;
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

    onDestroy() {
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
            this.item.set({fontSize: fontSize});
            this.canvas.renderAll();
        }
    }

    setFill(fill: string) {
        this.fill = fill;
        this.objectStore.setFill(fill);
    }

    setFontFamily(fontFamily: string) {
        this.fontFamily = fontFamily;
        this.item?.set({fontFamily: fontFamily});
    }

    setTextAlign(textAlign: string) {
        this.textAlign = textAlign;
        this.item?.set({textAlign: textAlign});
    }

    setUnderline(underline: boolean) {
        this.underline = underline;
        this.item?.set({underline: underline});
    }

    setBold(bold: boolean) {
        const changedValue = bold ? FontWeight.BOLD : FontWeight.NORMAL;
        this.fontWeight = changedValue;
        this.item?.set({fontWeight: changedValue});
    }

    isBold() {
        return this.fontWeight === FontWeight.BOLD;
    }

    setItalic(italic: boolean) {
        const changedValue = italic ? "italic" : "normal";
        this.fontStyle = changedValue;
        this.item?.set({fontStyle: changedValue});
    }

    isItalic() {
        return this.fontStyle === "italic";
    }

    private addEventListener() {
        this.mouseEventStore.subscribe(MouseEventType.MOUSE_UP, this.listeners.onMouseUp);
        this.objectEventStore.subscribe(ObjectEventType.OBJECT_MODIFIED, this.listeners.onModified);
        this.selectionEventStore.subscribe(this.listeners.updateObject);
    }

    private removeEventListener() {
        this.mouseEventStore.unsubscribe(MouseEventType.MOUSE_UP, this.listeners.onMouseUp);
        this.objectEventStore.unsubscribe(ObjectEventType.OBJECT_MODIFIED, this.listeners.onModified);
        this.selectionEventStore.unsubscribe(this.listeners.updateObject);
    }

    private updateObject(object: fabric.Object | undefined) {
        if (object && this.objectStore.isText(object)) {
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

        this.fontSize = fontSize || defaultStyles.FONT_SIZE;
        this.fill = typeof fill === "string" ? fill : defaultStyles.FILL;
        this.fontFamily = fontFamily || defaultStyles.FONT_FAMILY;
        this.textAlign = textAlign || defaultStyles.TEXT_ALIGN;
        this.fontStyle = fontStyle === FontStyle.NORMAL || fontStyle === FontStyle.ITALIC ? fontStyle : defaultStyles.FONT_STYLE;
        this.fontWeight = typeof fontWeight === "string" ? fontWeight : defaultStyles.FONT_WEIGHT;
        this.underline = !!underline;
    }

    private onMouseUp(e: MouseEventObject) {
        if (!this.isTextTool()) {
            return;
        }

        this.item = new fabric.IText("텍스트를 입력해주세요", {
            top: e.currentCursorPosition.y,
            left: e.currentCursorPosition.x,
            fontSize: this.fontSize,
            fill: this.fill,
            fontFamily: this.fontFamily,
            textAlign: this.textAlign,
            fontStyle: this.fontStyle,
            fontWeight: this.fontWeight,
            underline: this.underline,
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
        const {target} = e;
        if (!target || !this.objectStore.isText(target)) {
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
                .filter(object => this.objectStore.isText(object))
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