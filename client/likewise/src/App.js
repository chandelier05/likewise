import React, {Component} from 'react';
import firebase from "firebase";
import 'firebase/auth';
import 'firebase/database';
import './App.css';
import Navbar from './components/navbar/Navbar';
import GoogleLogin from 'react-google-login';

import SearchBar from "./components/Searchbar/searchbar";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import Container from '@material-ui/core/Container';
import PostNavigationPage from './PostNavigationPage';
import CreatePostPage from './CreatePostPage';
import UserPicture from './components/UserPicture';
import circle from './assets/userImg.PNG';
import DetailedPostPage from './DetailedPostPage';
import HomePage from './HomePage';
import {Switch, Route} from 'react-router-dom';
import DetailedPost from './components/DetailedPost';

// function App() {
//   return (
//     <div>
//       <header>
//         <Navbar/>
//       </header>
//      
//       <footer>
//         <Footer/>
//       </footer>
//     </div>
//   );
// }
// export default App;
const responseGoogle = (response) => {
  console.log(response);
}
export default class App extends Component {
  state = { isSignedIn: false};
  componentDidMount = () =>{

    firebase.auth().onAuthStateChanged(user => {
      this.setState({isSignedIn:!!user})
      console.log("user", user)
    })
  }
  render() {
    return (
      <div>
        <header>
          <Navbar/>
          <SearchBar/>
        </header>
        <Switch>
          <Route exact path="/">
            <HomePage isSignedIn={this.state.isSignedIn}/>
          </Route>
          <Route exact path="/posts">
            <PostNavigationPage/>
          </Route>
          <Route path="/createPost">
            <CreatePostPage/>
          </Route>
          <Route path="/posts/:pid">
            <DetailedPostPage/>
          </Route>
        </Switch>
      </div>
    )
  }
}