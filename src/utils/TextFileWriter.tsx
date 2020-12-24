export class TextFileWriter {
    public static write(fileName: string, content: string): void {
        const global = (window as any);
        const blob = new Blob([content], { type: 'text/plain' });
        const objectURL = window.URL.createObjectURL(blob);

        if (global.__Xr_objURL_forCreatingFile__) {
            global.URL.revokeObjectURL(global.__Xr_objURL_forCreatingFile__);
        }
        global.__Xr_objURL_forCreatingFile__ = objectURL;

        const a = document.createElement('a');
        a.download = fileName;
        a.href = objectURL;
        a.click();
    }
}