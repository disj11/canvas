import {fabric} from "fabric";
import {DeleteImageElement} from "../../components/element/DeleteImageElement";

type DeleteAction = (eventData: MouseEvent, transformData: fabric.Transform, x: number, y: number) => boolean;

export class DeleteControl {
    public static init(deleteAction: DeleteAction) {
        fabric.Object.prototype.controls.deleteControl = new fabric.Control({
            x: 0.5,
            y: -0.5,
            offsetY: -16,
            offsetX: 16,
            cursorStyle: 'pointer',
            mouseUpHandler: deleteAction,
            render: this.renderIcon(DeleteImageElement),
        })
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