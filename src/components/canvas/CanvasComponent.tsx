import { FabricCanvas } from "models/canvas";
import React from "react";

interface Props {
    id: string;
    options?: fabric.ICanvasOptions;
}

const CanvasComponent = ({ id, options, ...other }: Props) => {
    const [canvas, setCanvas] = React.useState<FabricCanvas>();

    React.useEffect(() => {
        setCanvas(new FabricCanvas(id, options));
    }, [id, options]);

    return (
        <div>
            <button onClick={() => canvas?.addRect()}>add rect</button>
            <canvas id={id} {...other} />
        </div>
    )
}

export default CanvasComponent;