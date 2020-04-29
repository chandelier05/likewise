import React, { useState, useContext } from 'react';
import './style.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Paw from "../../assets/paw.png"
import {UserContext} from '../../providers/firebaseUser';
import {auth} from '../../utils/firebase';

export default function Navbar(props) {
    const [redirect, setDirect] = useState(false);
    const user = useContext(UserContext);
    const handleLogin = (event) => {
        event.preventDefault();
        props.signInCallback();
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
            {user ? <Link to="/createPost"><Button variant="contained" id="createPostHotfix" size="large">Create Post</Button></Link> : <div></div>}
            <div className="loginFunc">
            {
              user ?  
              <Link to="/account">
                <Button variant="contained" id="account" size="large">Account</Button>
                <Button variant="contained" id="logout" size="large" onClick={() => auth.signOut()}>Log Out</Button>
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
