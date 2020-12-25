export class TextFileWriter {
    public static write(fileName: string, content: string): void {
        const blob = new Blob([content], { type: 'text/plain' });
        const objectURL = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.download = fileName;
        a.href = objectURL;
        a.click();
    }
}