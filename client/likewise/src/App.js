import React, {Component} from 'react';
import firebase from "firebase";
import 'firebase/auth';
import 'firebase/database';
import './App.css';
import Navbar from './components/navbar/Navbar';
import SearchBar from "./components/Searchbar/searchbar";
import PostNavigationPage from "./pages/PostNavigationPage/PostNavigationPage";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
import DetailedPostPage from './pages/DetailedPostPage/DetailedPostPage'
import HomePage from './pages/HomePage/HomePage';
import AccountPage from './pages/AccountPage/AccountPage';
import {Switch, Route, Redirect} from 'react-router-dom';



export default class App extends Component {
  constructor(props) {
    super(props);
    //this.signedIn = this.signedIn.bind(this);
    //var user = new LoginController(this.signedIn);
    this.state = {
      user: null,
      loading: true,
      firstName: "",
      lastName: "",
    }
  }

  handleSignIn = () => {
    var provider = new firebase.auth.GoogleAuthProvider();
    // TODO: WHY IS THEN() NOT CALLED?
    // guess it's the problem of the setState function?
    var userInfo = firebase.auth().signInWithPopup(provider).then(function(result) {
      // this.setState({user: result.user});
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential;
    })
  }

  handleSignOut = () => {
    firebase.auth().signOut().then(function() {
      //console.log("sign out successfull")
    }).catch(function(error) {
      // An error happened.
    });
  }
  componentDidMount() {
    this.setState({loading: true})
    this.authUnsubFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        console.log("setting firebase user state");
        let nameArr = firebaseUser.displayName.split(' ');
        firebase.firestore().collection('users').doc(firebaseUser.uid).set(
          {
            firstName: nameArr[0],
            lastName: nameArr[nameArr.length - 1],
            email: firebaseUser.email,
          }
        ).then(() => {
          let nameArr = firebaseUser.displayName.split(' ');
          this.setState({user: firebaseUser, loading: false, firstName: nameArr[0], lastName: nameArr[nameArr.length - 1]});
        }).catch((e) => {
          console.log(e);
        })
      } else {
        this.setState({user: null, loading: false});
      }
    });
  }

  componentWillUnmount() {
    this.authUnsubFunction();
    this.setState({errorMessage: null});
  }

  render() {
    if (this.state.loading) {
      return (
        <div>
          I'm Loading!
        </div>
      )
    }
    let signedIn = false;
    let navbar = (
      <Navbar loggedIn={false} handleSignOut={this.handleSignOut} signInCallback={this.handleSignIn}/>
    );
    let body = (
      <div>
        <header>
          {navbar}
        </header>
        <Switch>
          <Route exact path="/">
              <HomePage/>
          </Route>
          <Redirect to="/"/>
        </Switch>
      </div>
    )
    if (this.state.user) {
      navbar = <Navbar loggedIn={true} handleSignOut={this.handleSignOut} signInCallback={this.handleSignIn} uid={this.state.user.uid}/>
      signedIn = true;
      body = (
        <div>
          <header>
            {navbar}
          </header>
          <Switch>
            <Route exact path="/">
              <HomePage/>
            </Route>
            <Route exact path="/posts">
              <PostNavigationPage/>
            </Route>
            <Route path="/createPost">
              <CreatePostPage user={this.state.user}/>
            </Route>
            <Route path="/posts/:pid">
              <DetailedPostPage user={this.state.user} firstName={this.state.firstName} lastName={this.state.lastName}/>
            </Route>
            <Route path="/account/:uid">
              <AccountPage user={this.state.user}/>
            </Route>
          </Switch>
        </div>
      );
    }
    return body;
  }
}
