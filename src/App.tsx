import {Canvas} from 'templates/canvas';
import React from 'react';

const App = () => {
    React.useEffect(() => {
        document.title = "캔버스";
    }, []);

    return (
        <Canvas/>
    );
}

export default App;
