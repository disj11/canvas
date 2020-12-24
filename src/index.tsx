import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {FabricContextProvider} from "./contexts/FabricContext";
import {StoreContextProvider} from "./contexts/StoreContext";

ReactDOM.render(
    <React.StrictMode>
        <StoreContextProvider>
            <FabricContextProvider>
                <App/>
            </FabricContextProvider>
        </StoreContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);