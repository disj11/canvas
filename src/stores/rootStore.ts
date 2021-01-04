import { fabric } from "fabric";
import { BrushStore } from "./brushStore";
import { CanvasStore } from "./canvasStore";
import { MouseEventStore } from "./mouseEventStore";
import { ObjectManagerStore } from "./objectManagerStore";
import { ShapeStore } from "./shapeStore";
import { UIStore } from "./UIStore";

export class RootStore {
    private readonly canvasElement: HTMLCanvasElement;
    canvasStore: CanvasStore;
    objectManagerStore: ObjectManagerStore;
    mouseEventStore: MouseEventStore;
    brushStore: BrushStore;
    shapeStore: ShapeStore;
    UIStore: UIStore;

    constructor() {
        this.canvasElement = document.createElement("canvas");
        document.body.append(this.canvasElement);

        this.canvasStore = new CanvasStore(this, new fabric.Canvas(this.canvasElement));
        this.objectManagerStore = new ObjectManagerStore(this);
        this.mouseEventStore = new MouseEventStore(this);
        this.brushStore = new BrushStore(this);
        this.shapeStore = new ShapeStore(this);
        this.UIStore = new UIStore(this);
    }

    init(container: HTMLElement): void {
        container.append(this.canvasElement.parentElement as Node);
        this.canvasStore.init();
    }
}

export default new RootStore();