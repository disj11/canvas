import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {StoreContextProvider} from "./contexts/StoreContext";

ReactDOM.render(
    <React.StrictMode>
        <StoreContextProvider>
            <App/>
        </StoreContextProvider>
    </React.StrictMode>,
    document.getElementById('root')
);