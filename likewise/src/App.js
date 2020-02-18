import React from 'react';
import logo from './logo.svg';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Significance from './components/section2/Significance';
import {Container} from '@material-ui/core';

function App() {
  return (
    <div>
      <header>
        <Navbar/>
      </header>
      <Container className="homepage">
        <Significance/>
      </Container>
    </div>
  );
}

export default App;
