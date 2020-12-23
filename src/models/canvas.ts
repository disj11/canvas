import { fabric } from "fabric";

export class FabricCanvas {
    private readonly canvas: fabric.Canvas;
    
    constructor(id: string, options?: fabric.ICanvasOptions) {
        this.canvas = new fabric.Canvas(id, options)
    }

    public addRect() {
        this.canvas.add(new fabric.Rect({
            width: 30,
            height: 30,
        }));
    }
}