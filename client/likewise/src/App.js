import React, {Component} from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Section1 from './components/LandingComps/section1/index';
import Significance from './components/LandingComps/section2/Significance';
import Footer from './components/LandingComps/section3/Footer';
import SearchBar from "./components/Searchbar/searchbar";



function App() {
  return (
    <div>
      <header>
        <Navbar/>
        <SearchBar/>
      </header>
      <div className="homepage">
        <Section1/>
        <Significance/>
      </div>
      <footer>
        <Footer/>
      </footer>
    </div>
  );
}
export default App;
