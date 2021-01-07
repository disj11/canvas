export const fontSizes = [8, 9, 10, 11, 12, 14, 16, 18, 20, 22, 24, 26, 28, 36, 48, 72, 94, 130];

export enum FontFaceType {
    DEFAULT,
    GOOGLE,
}

export class FontFaces {
    private static readonly _values: FontFaces[] = [];
    public static readonly TIMES_NEW_ROMAN = new FontFaces("Times New Roman", "Times New Roman", FontFaceType.DEFAULT);
    public static readonly NOTO_SANS_KR = new FontFaces("Noto Sans KR", "Noto Sans KR", FontFaceType.GOOGLE);
    public static readonly EAST_SEA_DOKDO = new FontFaces("East Sea Dokdo", "East Sea Dokdo", FontFaceType.GOOGLE);

    constructor(
        public readonly value: string,
        public readonly display: string,
        public readonly type: FontFaceType,
    ) {
        FontFaces._values.push(this);
    }

    public static values() {
        return this._values;
    }

    public static valueOf(value: string) {
        return this.values().find(v => v.value === value);
    }

    public static getGoogleFonts() {
        return this.values().filter(font => font.type === FontFaceType.GOOGLE);
    }
}