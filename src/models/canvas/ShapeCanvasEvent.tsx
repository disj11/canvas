import { CanvasEventHandler, CanvasEventObject } from "./CanvasEventModel";
import { ShapeType } from "./Shape";

const MIN_OBJECT_SIZE = 10;

interface ShapeCanvasEvent extends CanvasEventObject {
    object: fabric.Object,
}

export class ShapeCanvasMouseUpEvent implements CanvasEventHandler<ShapeCanvasEvent> {
    handle(e: ShapeCanvasEvent): void {
        if (e.object.isType(ShapeType.RECT.value) || e.object.isType(ShapeType.TRIANGLE.value)) {
            e.object.set({
                width: Math.max(MIN_OBJECT_SIZE, e.object.width || MIN_OBJECT_SIZE),
                height: Math.max(MIN_OBJECT_SIZE, e.object.height || MIN_OBJECT_SIZE),
            }).setCoords();
        } else if (e.object.isType(ShapeType.ELLIPSE.value)) {
            const circle = e.object as fabric.Ellipse;
            circle.set({
                rx: Math.max(MIN_OBJECT_SIZE / 2, circle.rx || MIN_OBJECT_SIZE / 2),
                ry: Math.max(MIN_OBJECT_SIZE / 2, circle.ry || MIN_OBJECT_SIZE / 2),
            }).setCoords();
        }
        e.canvasStore.canvas.renderAll();
    }
}

export class ShapeCanvasMouseDownEvent implements CanvasEventHandler<ShapeCanvasEvent> {
    handle(e: ShapeCanvasEvent): void {
        e.object = e.canvasStore.shapeType.getShape({
            left: e.startCursorPosition.x,
            top: e.startCursorPosition.y,
            hasBorder: true,
            stroke: "#000",
            strokeWidth: 3,
            fill:"transparent",
            selectable: false,
            hoverCursor: "default",
        });

        if (e.object.isType(ShapeType.RECT.value) || e.object.isType(ShapeType.TRIANGLE.value)) {
            e.object.set({
                width: 0,
                height: 0,
            })
        } else if (e.object.isType(ShapeType.ELLIPSE.value)) {
            (e.object as fabric.Ellipse).set({
                rx: 0,
                ry: 0,
            })
        }

        e.canvasStore.canvas.add(e.object);
    }
}

export class ShapeCanvasMouseMoveEvent implements CanvasEventHandler<ShapeCanvasEvent> {
    handle(e: ShapeCanvasEvent): void {
        if(e.currentCursorPosition.x < e.startCursorPosition.x){
            e.object.set("left", Math.abs(e.currentCursorPosition.x));
        }

        if(e.currentCursorPosition.y < e.startCursorPosition.y){
            e.object.set("top", Math.abs(e.currentCursorPosition.y));
        }

        if (e.object.isType(ShapeType.RECT.value) || e.object.isType(ShapeType.TRIANGLE.value)) {
            e.object.set({
                width: Math.abs(e.startCursorPosition.x - e.currentCursorPosition.x),
                height: Math.abs(e.startCursorPosition.y - e.currentCursorPosition.y),
            });
        } else if (e.object.isType(ShapeType.ELLIPSE.value)) {
            (e.object as fabric.Ellipse).set({
                rx: Math.abs(e.startCursorPosition.x - e.currentCursorPosition.x) / 2,
                ry: Math.abs(e.startCursorPosition.y - e.currentCursorPosition.y) / 2,
            })
        }

        e.canvasStore.canvas.renderAll();
    }
}
