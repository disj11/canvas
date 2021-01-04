import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import {StoreProvider} from "./contexts/storeContext";
import rootStore from "./stores/rootStore";

ReactDOM.render(
    <React.StrictMode>
        <StoreProvider value={rootStore}>
            <App/>
        </StoreProvider>
    </React.StrictMode>,
    document.getElementById('root')
);