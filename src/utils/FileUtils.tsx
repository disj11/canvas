export class FileUtils {
    public static write(fileName: string, text: string): void {
        const blob = new Blob([text], { type: 'text/plain' });
        const objectURL = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.download = fileName;
        a.href = objectURL;
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