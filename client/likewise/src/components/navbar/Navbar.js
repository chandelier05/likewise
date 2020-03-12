import React, { Component } from 'react';
import './style.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import firebase, { app } from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import Paw from "../../assets/paw.png"

class Navbar extends Component {
    
    state = { isSignedIn: false}
    //resources
    //https://github.com/firebase/firebaseui-web-react
    //https://github.com/lingonsaft/React-FirebaseUi-Authentication/blob/master/src/App.js
    uiConfig = { 
        signInFlow: "redirect", 
        SignInSuccessUrl: './pages/PostNavigationPage/PostNavigationPage', 
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

    render() {
        return (
            <div className="navbar">
                <AppBar position="static" className="bar page-container" style={{ background: "#FFF" }} >
                    <Toolbar>
                        <img src={Paw} alt="Paw Icon" />
                        <Typography variant="h5" className="title">
                            LIKEWISE
                        </Typography>
                        <StyledFirebaseAuth 
                        uiConfig={this.uiConfig} 
                        firebaseAuth={firebase.auth()}/>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Navbar;
