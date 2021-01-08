import { ToolTypes } from "models/tools/ToolTypes";
import { CanvasModeManager } from "./canvasStore";
import { RootStore } from "./rootStore";

export class SelectStore implements CanvasModeManager {
    constructor(private readonly rootStore: RootStore) {
        rootStore.canvasStore.registerCanvasModeManager(ToolTypes.SELECT, this);
    }

    onSessionStart() {
        this.rootStore.canvasStore.setSelectable(true);
        this.rootStore.canvasStore.setHoverCursor("move");
    }

    onSessionEnd() {
        //
    }
}