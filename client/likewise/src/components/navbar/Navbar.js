import React, { useContext } from 'react';
import './style.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';
import Paw from "../../assets/paw.png"
import {UserContext} from '../../providers/firebaseUser';
import {auth} from '../../utils/firebase';
import {signInWithGoogle} from "../../utils/firebase";
import { useLocation } from 'react-router-dom'

export default function Navbar(props) {
  const user = useContext(UserContext);
  var location = useLocation();
  const handleLogin = (event) => {
      event.preventDefault();
      signInWithGoogle();
  };
  const handleSignOut = (event) => {
    event.preventDefault();
    auth.signOut();
  }
  return (
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
        {user !== "logout" && location.pathname !== '/'? <Link to="/createPost"><Button variant="contained" id="createPostHotfix" size="large">Create Post</Button></Link> : <div></div>}
        <div className="login-func">
        {
          user !== "logout" ? 
          <div>
            <Link to="/account">
              <Button variant="contained" id="account" size="large">Account</Button>
            </Link>
              <Button variant="contained" id="logout" size="large" onClick={handleSignOut}>Log Out</Button>
          </div>
          :
          <Button variant="contained" id="signin" size="large" onClick={handleLogin}>Sign in with UW NetID</Button>
        }
        </div>
      </Toolbar>
    </AppBar>
  );
}
