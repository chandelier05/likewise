import React, { Component } from 'react';
import './style.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

import firebase, { app } from "firebase";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import Paw from "../../assets/paw.png"

class Navbar extends Component {
    
    state = { isSignedIn: false}
    //resources
    //https://github.com/firebase/firebaseui-web-react
    //https://github.com/lingonsaft/React-FirebaseUi-Authentication/blob/master/src/App.js
    uiConfig = { 
        signInFlow: "popup", 
        SignInSuccessUrl: '/', 
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
                        <Link to="/posts">
                            <img src={Paw} alt="Paw Icon" />
                        </Link>
                        <Link to="/">
                            <Typography variant="h5" className="title">
                                LIKEWISE
                            </Typography>
                        </Link>
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
