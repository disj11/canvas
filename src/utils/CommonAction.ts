import {Transform} from "fabric/fabric-impl";
import {fabric} from "fabric";
import {DeleteImageElement} from "../components/element/DeleteImageElement";

export class CommonAction {
    public static init() {
        fabric.Object.prototype.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: -16,
            offsetX: 16,
            cursorStyle: 'pointer',
            mouseUpHandler: this.deleteObject,
            render: this.renderIcon(DeleteImageElement),
        })
    }

    private static deleteObject(_eventData: MouseEvent, transform: Transform) {
        const target = transform.target;
        const canvas = target.canvas;
        if (!canvas) {
            return false;
        }

        canvas.remove(target);
        canvas.requestRenderAll();
        return true;
    }

    private static renderIcon(icon: CanvasImageSource) {
        return (ctx: CanvasRenderingContext2D, left: number, top: number, styleOverride: any, fabricObject: fabric.Object) => {
            const size = fabricObject.cornerSize;
            if (size) {
                ctx.save();
                ctx.translate(left, top);
                ctx.rotate(fabric.util.degreesToRadians(fabricObject.angle || 0));
                ctx.drawImage(icon, -size / 2, -size / 2, size, size);
                ctx.restore();
            }
        };
    }
}