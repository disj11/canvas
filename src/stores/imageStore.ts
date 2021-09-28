import {RootStore} from "./rootStore";
import {CanvasStore} from "./canvasStore";
import {makeAutoObservable} from "mobx";
import {fabric} from "fabric";
import {ObjectStore} from "./objectStore";

export class ImageStore {
    public readonly uploadedImages: {name: string, dataUrl: string}[] = [];
    private readonly canvasStore: CanvasStore;
    private readonly objectStore: ObjectStore;

    constructor(
        private readonly rootStore: RootStore,
    ) {
        makeAutoObservable(this);
        this.canvasStore = rootStore.canvasStore;
        this.objectStore = rootStore.objectStore;
    }

    public addImage(dataUrl: string): void {
        fabric.Image.fromURL(dataUrl, (img) => {
            if (!img.width || !img.height) {
                return;
            }

            if (img.width > this.canvasStore.width) {
                const scale = this.canvasStore.width / img.width * (3/4);
                this.objectStore.setScaleX(scale, img);
                this.objectStore.setScaleY(scale, img);
            } else if (img.height > this.canvasStore.height) {
                const scale = this.canvasStore.height / img.height * (3/4);
                this.objectStore.setScaleX(scale, img);
                this.objectStore.setScaleY(scale, img);
            }

            this.canvasStore.canvas.add(img);
        });
    }

    public upload(files: File[]) {
        files.forEach(async (file) => {
            const dataUrl = await this.readFileAsync(file);
            if (typeof dataUrl === "string") {
                this.uploadedImages.push({
                    name: file.name,
                    dataUrl: dataUrl,
                });
            }
        });
    }

    private readFileAsync(file: File): Promise<string | ArrayBuffer | null> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = () => reject();
            reader.readAsDataURL(file);
        })
    }
}