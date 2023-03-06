import React , {useState} from 'react';
import './App.css';
import Canvas from './Canvas';
import { CanvasCubemap } from './CanvasCubemap';

function App() {

  const [showcubemap , setShowCubemap ] = useState(false)

  function handleCubemapChange() : void {

    setShowCubemap(true)

  }

  return (
    <div className="App">

      {
        showcubemap && showcubemap ? <CanvasCubemap /> : <Canvas  changecube={handleCubemapChange}/>
      }
      
    </div>
  );
}

export default App;
