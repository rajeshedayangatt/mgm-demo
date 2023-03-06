import React , {useState} from 'react';
import './App.css';
import Canvas from './Canvas';
import { CanvasCubemap } from './CanvasCubemap';
import Container from '@mui/material/Container';

function App() {

  const [showcubemap , setShowCubemap ] = useState(false)

  function handleCubemapChange() : void {

    setShowCubemap(true)

  }

  return (
    <Container maxWidth="lg">

      {
        showcubemap && showcubemap ? <CanvasCubemap /> : <Canvas  changecube={handleCubemapChange}/>
      }
      
      </Container>
    );
}

export default App;
