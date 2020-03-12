import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';

//import and configure firebase here
import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth'; 

  // Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: "AIzaSyD52Aj5zVWvvbmjJpOTQqluhPPIC_BrDuQ",
    authDomain: "localhost",
    databaseURL: "https://likewise-269823.firebaseio.com",
    projectId: "likewise-269823",
    storageBucket: "likewise-269823.appspot.com",
    messagingSenderId: "691783787003",
    appId: "1:691783787003:web:af2e818be76bfa9cfbeb5e"
  };
 
  firebase.initializeApp(firebaseConfig);

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
