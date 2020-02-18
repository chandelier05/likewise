import React, { Component } from 'react';
import './style.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

class Navbar extends Component {
    render() {
        return (
            <div className="navbar" style={{background: "#8481E2"}}>
            <AppBar position="static" className="bar page-container" style={{background: "#8481E2"}} >
                <Toolbar>
                    <Typography variant="h5" className="title">
                        LIKEWISE
                    </Typography>
                    <Button variant="contained" id="login">Login</Button>
                </Toolbar>
            </AppBar>
        </div>
        );
    }
}

export default Navbar;
