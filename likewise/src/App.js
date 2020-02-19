import React, {Component} from 'react';
import './App.css';
import NavBar from "./components/navbar/index";
import Section1 from "./components/section1/index";

class App extends Component {
  render() {
    return (
      <>
        <NavBar/>
        <Section1/>
        
      </>
    );
  }
}
export default App;
