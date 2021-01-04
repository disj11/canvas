export class ToolTypes {
    private static readonly _values: ToolTypes[] = [];
    public static readonly SELECT = new ToolTypes("select", "선택");
    public static readonly BRUSH = new ToolTypes("brush", "브러시");
    public static readonly SHAPE = new ToolTypes("shape", "셰이프");
    public static readonly TEXT = new ToolTypes("text", "텍스트");
    public static readonly CANVAS = new ToolTypes("canvas", "캔버스");

    constructor(
        public readonly value: string,
        public readonly display: string,
    ) {
        ToolTypes._values.push(this);
    }

    public static values() {
        return this._values;
    }

    public static valueOf(value: string) {
        return this.values().find(v => v.value === value);
    }
}