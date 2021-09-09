import {Canvas} from 'templates/canvas';
import React from 'react';
import {StoreProvider} from "./contexts/storeContext";
import rootStore from "./stores/rootStore";
import {CssBaseline} from "@material-ui/core";

const App = () => {
    React.useEffect(() => {
        document.title = "캔버스";
    }, []);

    return (
        <React.Fragment>
            <CssBaseline />
            <StoreProvider value={rootStore}>
                <Canvas/>
            </StoreProvider>
        </React.Fragment>
    );
}

export default App;
