import React, { useState } from 'react';
import './style.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';

import firebase, { app } from "firebase";

import Paw from "../../assets/paw.png"

export default function Navbar(props) {
    const handleLogin = (event) => {
        event.preventDefault();
        var provider = new firebase.auth.GoogleAuthProvider();
        // TODO: WHY IS THEN() NOT CALLED?
        // guess it's the problem of the setState function?
        var userInfo = firebase.auth().signInWithPopup(provider).then(function(result) {
          // this.setState({user: result.user});
          localStorage.setItem("userName",result.user.displayName);
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebase.auth.AuthCredential type that was used.
            var credential = error.credential;
        })
       // props.signInCallback();
    }

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
                    <div className="loginFunc">
                    {
                        props.loggedIn ?  
                        <Button variant="contained" id="logout" size="large" onClick={props.handleSignOut}>Logout</Button>
                        :
                        <Button variant="contained" id="signin" size="large" onClick={handleLogin}>Sign In</Button>
                    }
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}