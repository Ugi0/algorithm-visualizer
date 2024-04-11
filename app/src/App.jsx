import './App.css';
import Grid from './components/Grid/Grid';
import React from 'react';

const App = () => {
  var pressedDown = false;

  const getPressedDown = () => {
    return pressedDown
  }

  const setPressedDown = (value) => {
    pressedDown = value;
  }

  return (
    <div className="App" onMouseUp={() => setPressedDown(false)}>
        <Grid setPressedDown={setPressedDown} getPressedDown={getPressedDown}/>
      </div>
  );
}

export default App;
