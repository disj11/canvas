import {makeAutoObservable} from "mobx";

export class CanvasStore {
    private _canvasWidth = 500;
    private _canvasHeight = 500;

    constructor() {
        makeAutoObservable(this);
    }

    get canvasWidth(): number {
        return this._canvasWidth;
    }

    set canvasWidth(value: number) {
        this._canvasWidth = value;
    }

    get canvasHeight(): number {
        return this._canvasHeight;
    }

    set canvasHeight(value: number) {
        this._canvasHeight = value;
    }
}