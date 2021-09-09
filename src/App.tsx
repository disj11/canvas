import {Canvas} from 'templates/canvas';
import React from 'react';
import {StoreProvider} from "./contexts/storeContext";
import rootStore from "./stores/rootStore";
import {CssBaseline} from "@material-ui/core";
import {ThemeProvider} from "./theme";

const App = () => {
    React.useEffect(() => {
        document.title = "캔버스";
    }, []);

    return (
        <ThemeProvider>
            <CssBaseline />
            <StoreProvider value={rootStore}>
                <Canvas/>
            </StoreProvider>
        </ThemeProvider>
    );
}

export default App;
