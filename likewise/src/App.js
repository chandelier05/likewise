import React, {Component} from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Section1 from './components/section1/index';
import Significance from './components/section2/Significance';


function App() {
  return (
    <div>
      <header>
        <Navbar/>
      </header>
      <div className="homepage">
        <Section1/>
        <Significance/>
      </div>
      <footer>
        
      </footer>
    </div>
  );
}
export default App;
