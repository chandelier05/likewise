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
        props.signInCallback();
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