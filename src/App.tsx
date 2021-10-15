import {Canvas} from 'templates/canvas';
import React from 'react';
import {StoreProvider} from "./contexts/storeContext";
import rootStore from "./stores/rootStore";
import createTheme from '@mui/material/styles/createTheme';
import {Theme, ThemeProvider} from '@mui/material/styles';
import {CssBaseline} from "@mui/material";
import ReactGA from 'react-ga';

declare module '@mui/styles/defaultTheme' {
    interface DefaultTheme extends Theme {}
}

const App = () => {
    const theme = React.useMemo(() => createTheme({
        palette: {
            primary: {
                main: "#292929",
            },
            secondary: {
                main: "#aa75ff",
            },
        }
    }), []);

    React.useEffect(() => {
        document.title = "캔버스";
        ReactGA.initialize('G-4QR05JWTBZ');
        ReactGA.pageview(window.location.pathname + window.location.search);
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
