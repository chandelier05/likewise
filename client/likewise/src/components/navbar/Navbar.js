import React, { Component } from 'react';
import './style.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Paw from "../../assets/paw.png"

//just in case
//<Button variant="contained" id="login">Login</Button>
class Navbar extends Component {
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
                        <Button variant="contained" color="primary" id="login">Login with Google</Button> 
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default Navbar;
