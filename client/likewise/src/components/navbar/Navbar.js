import React, { useState } from 'react';
import './style.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link, NavLink} from 'react-router-dom';
import Paw from "../../assets/paw.png"

export default function Navbar(props) {
    const [redirect, setDirect] = useState(false);
    const handleLogin = (event) => {
        event.preventDefault();
        props.signInCallback();
    };
    const handleCreatePost = () => {
      setDirect(!redirect);
    };
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
            {props.loggedIn ? <Link to="/createPost"><Button variant="contained" id="createPostHotfix" size="large">Create Post</Button></Link> : <div></div>}
            <div className="loginFunc">
            {
              props.loggedIn ?  
              <Link to={"/account/" + props.uid}>
                <Button variant="contained" id="logout" size="large">Account</Button>
              </Link>
              :
              <Button variant="contained" id="signin" size="large" onClick={handleLogin}>Sign In</Button>
            }
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
}
