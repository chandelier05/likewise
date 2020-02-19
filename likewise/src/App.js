import React, {Component} from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Section1 from './components/section1/index';
import Significance from './components/section2/Significance';
import {Container} from '@material-ui/core';

function App() {
  return (
    <div>
      <header>
        <Navbar/>
        <Section1/>
      </header>
      <Container className="homepage">
        <Significance/>
      </Container>
    </div>
  );
}
export default App;
