import {Canvas} from 'templates/canvas';
import React from 'react';
import {StoreProvider} from "./contexts/storeContext";
import rootStore from "./stores/rootStore";
import createTheme from '@mui/material/styles/createTheme';
import {ThemeProvider} from "@mui/styles";
import {Theme} from '@mui/material/styles';
import {CssBaseline} from "@mui/material";

declare module '@mui/styles/defaultTheme' {
    interface DefaultTheme extends Theme {}
}

const theme = createTheme();
const App = () => {
    React.useEffect(() => {
        document.title = "캔버스";
    }, []);

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline/>
            <StoreProvider value={rootStore}>
                <Canvas/>
            </StoreProvider>
        </ThemeProvider>
    );
}

export default App;
