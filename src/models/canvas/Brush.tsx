import {fabric} from "fabric";

export class BrushType {
    private static readonly _values: BrushType[] = [];
    public static readonly PENCIL = new BrushType("pencil", "연필");
    public static readonly CIRCLE = new BrushType("circle", "원형");
    public static readonly SPRAY = new BrushType("spray", "스프레이");

    constructor(
        public readonly value: string,
        public readonly display: string,
    ) {
        BrushType._values.push(this);
    }

    public static values() {
        return this._values;
    }

    public static valueOf(value: string) {
        return this.values().find(v => v.value === value);
    }
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