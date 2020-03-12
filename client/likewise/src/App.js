import React, {Component} from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Section1 from './components/LandingComps/section1/index';
import Significance from './components/LandingComps/section2/Significance';
import Footer from './components/LandingComps/section3/Footer';
import SearchBar from "./components/Searchbar/searchbar";

import firebase, { app } from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";


class App extends Component {
  state = { isSignedIn: false};
  uiConfig = { 
    signInFlow: "popup", 
    SignInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ], 
    callbacks: {
      signInSuccess: () => false
    }
  };

  componentDidMount = () =>{

    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn:!!user})
      console.log("user", user)
    })
  }

  render(){
    return (
      <div>
        <header>
          <Navbar/>
          <StyledFirebaseAuth
          uiConfig={this.uiConfig}
          firebaseAuth={firebase.auth()}/>
          <SearchBar/>
        </header>
        {this.state.isSignedIn ? (
          <div>Signed In!</div>
        ) : (<>
          <div className="homepage">
          <Section1/>
          <Significance/>
          </div>
          <footer>
          <Footer/>
          </footer>
          </>)}
      </div>
    );
  }
}
export default app
