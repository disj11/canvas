import React from "react";
import {fabric} from "fabric";

export const FabricContext = React.createContext<FabricContextValue>({
    canvas: null,
    initCanvas: () => {},
});

export const FabricContextProvider = ({children}: FabricContextProviderProps) => {
    const [canvas, setCanvas] = React.useState<fabric.Canvas | null>(null);

    const initCanvas = React.useCallback((el: HTMLCanvasElement, options?: fabric.ICanvasOptions) => {
        setCanvas(new fabric.Canvas(el, options));
    }, []);

    return (
        <FabricContext.Provider value={{canvas, initCanvas}}>
            {children}
        </FabricContext.Provider>
    )
}

interface FabricContextValue {
    canvas: fabric.Canvas | null,
    initCanvas: (el: HTMLCanvasElement, options?: fabric.ICanvasOptions) => void,
}

interface FabricContextProviderProps {
    children: JSX.Element;
}