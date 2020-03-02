import React, { Component } from 'react';
import './style.css';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
//import Button from '@material-ui/core/Button';

import {GoogleLogin, useGoogleLogin} from 'react-google-login';

//just in case
//<Button variant="contained" id="login">Login</Button>
class Navbar extends Component {
    
    render() {
        const responseGoogle = (response) => {
            console.log(response);
          }

          const { signIn, loaded } = useGoogleLogin({
            onSuccess,
            clientId,
            cookiePolicy,
            loginHint,
            hostedDomain,
            autoLoad,
            isSignedIn,
            fetchBasicProfile,
            redirectUri,
            discoveryDocs,
            onFailure,
            uxMode,
            scope,
            accessType,
            responseType,
            jsSrc,
            onRequest,
            prompt
          })
          
        return (
            <div className="navbar" style={{background: "#8481E2"}}>
            <AppBar position="static" className="bar page-container" style={{background: "#8481E2"}} >
                <Toolbar>
                    <Typography variant="h5" className="title">
                        LIKEWISE
                    </Typography>
                    <GoogleLogin
                clientId="691783787003-ec0rhkknvm5708q8bdgdae87qv9h29nc.apps.googleusercontent.com"
                buttonText="LOGIN WITH GOOGLE"
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                cookiePolicy={'single_host_origin'}
                />

                </Toolbar>
            </AppBar>
        </div>
        );
    }
}

class Dropdown extends Component {
    render() {
        return (
           <div id="dropdown">

            </div>

        );
    }
}

export default Navbar;
