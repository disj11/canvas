import { Canvas } from 'components/canvas';
import { Layout } from 'components/layout';
import React from 'react';

function App() {
  const [options, setOptions] = React.useState<fabric.ICanvasOptions>({
    width: 500,
    height: 500,
  });

  return (
    <Layout>
      <Canvas id="canvas" options={options} />
    </Layout>
  );
}

export default App;
