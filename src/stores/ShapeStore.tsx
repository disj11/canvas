import { makeAutoObservable } from "mobx";
import { ShapeType } from "models/canvas/Shape";

export class ShapeStore {
    private _shapeType = ShapeType.ELLIPSE;
    
    constructor() {
        makeAutoObservable(this);
    }

    get shapeType(): ShapeType {
        return this._shapeType;
    }

    public setShapeType(value: ShapeType) {
        this._shapeType = value;
    }
}