import React from 'react';
import ReactDOM from 'react-dom';
import UserProvider from './providers/firebaseUser';
import './index.css';
import App from './App';
//import * as serviceWorker from './serviceWorker';
import {BrowserRouter} from 'react-router-dom';


  // // Your web app's Firebase configuration
  // var firebaseConfig = {
  //   apiKey: "AIzaSyD52Aj5zVWvvbmjJpOTQqluhPPIC_BrDuQ",
  //   authDomain: "likewise-269823.firebaseapp.com",
  //   databaseURL: "https://likewise-269823.firebaseio.com",
  //   projectId: "likewise-269823",
  //   storageBucket: "likewise-269823.appspot.com",
  //   messagingSenderId: "691783787003",
  //   appId: "1:691783787003:web:af2e818be76bfa9cfbeb5e"
  // };
 
  // firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <UserProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </UserProvider>
  , document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.unregister();
