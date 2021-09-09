import {fabric} from "fabric";

export class ObjectBound {
    public readonly top: number;
    public readonly left: number;
    public readonly right: number;
    public readonly bottom: number;
    public readonly width: number;
    public readonly height: number;

    constructor(object: fabric.Object) {
        this.top = object.top || 0;
        this.left = object.left || 0;
        this.width = Math.ceil((object.width || 0) * (object.scaleX || 0));
        this.height = Math.ceil((object.height || 0) * (object.scaleY || 0));
        this.right = this.left + this.width;
        this.bottom = this.top + this.height;
    }
}