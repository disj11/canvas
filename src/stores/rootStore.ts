import { fabric } from "fabric";
import { BrushStore } from "./brushStore";
import { CanvasStore } from "./canvasStore";
import { MouseEventStore } from "./mouseEventStore";
import { SelectionEventStore } from "./selectionEventStore";
import { ObjectEventStore } from "./objectEventStore";
import { ShapeStore } from "./shapeStore";
import { UIStore } from "./UIStore";
import { TextStore } from "./textStore";
import { SelectStore } from "./selectStore";
import {ObjectStore} from "./objectStore";

export interface Store {
    onInit: () => void;
    onDestroy: () => void;
}

export class RootStore implements Store {
    private readonly canvasElement: HTMLCanvasElement;
    canvasStore: CanvasStore;
    selectionEventStore: SelectionEventStore;
    objectEventStore: ObjectEventStore;
    mouseEventStore: MouseEventStore;

    objectStore: ObjectStore;
    brushStore: BrushStore;
    shapeStore: ShapeStore;
    textStore: TextStore;
    selectStore: SelectStore;
    UIStore: UIStore;

    constructor() {
        this.canvasElement = document.createElement("canvas");
        document.body.append(this.canvasElement);

        this.canvasStore = new CanvasStore(this, new fabric.Canvas(this.canvasElement));
        this.selectionEventStore = new SelectionEventStore(this);
        this.objectEventStore = new ObjectEventStore(this);
        this.mouseEventStore = new MouseEventStore(this);

        this.objectStore = new ObjectStore(this);
        this.brushStore = new BrushStore(this);
        this.shapeStore = new ShapeStore(this);
        this.textStore = new TextStore(this);
        this.selectStore = new SelectStore(this);
        this.UIStore = new UIStore(this);
    }

    onInit() {
        Object.values(this).forEach(obj => {
            if (obj.onInit) {
                obj.onInit();
            }
        });
    }

    onDestroy() {
        Object.values(this).forEach(obj => {
            if (obj.onDestory) {
                obj.onDestory();
            }
        });
    }

    init(container: HTMLElement): void {
        container.append(this.canvasElement.parentElement!);
    }
}

export default new RootStore();