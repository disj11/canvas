import {fabric} from "fabric";

export enum BrushType {
    CIRCLE,
    PENCIL,
    SPRAY,
}

export class BrushFactory {
    public static getInstance(type: BrushType, canvas: fabric.Canvas) {
        switch (type) {
            case BrushType.PENCIL:
                return new (fabric.PencilBrush as any)(canvas);
            case BrushType.CIRCLE:
                return new (fabric.CircleBrush as any)(canvas);
            case BrushType.SPRAY:
                return new (fabric.SprayBrush as any)(canvas);
            default:
                return new (fabric.PencilBrush as any)(canvas);
        }
    }
}