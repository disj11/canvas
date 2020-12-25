enum MimeType {
    TEXT = "text/plain",
}

export class FileUtils {
    public static writeText(fileName: string, text: string) {
        const blob = new Blob([text], { type: MimeType.TEXT });
        const objectURL = window.URL.createObjectURL(blob);
        this.write(fileName, objectURL);
    }

    public static write(fileName: string, dataURL: string) {
        const a = document.createElement('a');
        a.download = fileName;
        a.href = dataURL;
        a.click();
    }

    public static async read(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = () => reject();
            reader.readAsText(file);
        });
    }
}