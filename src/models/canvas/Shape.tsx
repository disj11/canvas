import {fabric} from "fabric";

export class ShapeType {
    private static readonly _values: ShapeType[] = [];
    public static readonly RECT = new ShapeType("rect", "사각형");
    public static readonly CIRCLE = new ShapeType("circle", "원");
    public static readonly TRIANGLE = new ShapeType("triangle", "삼각형");

    constructor(
        public readonly value: string,
        public readonly display: string,
    ) {
        ShapeType._values.push(this);
    }

    public static values() {
        return this._values;
    }

    public static valueOf(value: string) {
        return this.values().find(v => v.value === value);
    }

    public getShape<T extends fabric.IObjectOptions>(options: T) {
        switch (this) {
            case ShapeType.RECT:
                return new fabric.Rect(options);
            case ShapeType.CIRCLE:
                return new fabric.Circle(options);
            case ShapeType.TRIANGLE:
                return new fabric.Triangle(options);
            default:
                return new fabric.Rect(options);
        }
    }
}