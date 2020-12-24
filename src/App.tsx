import {Canvas} from 'templates/canvas';
import React from 'react';
import {FabricContextProvider} from "./context/FabricContext";

function App() {
    return (
        <FabricContextProvider>
            <Canvas/>
        </FabricContextProvider>
    );
}

export default App;
