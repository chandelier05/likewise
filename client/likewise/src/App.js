import React, {Component} from 'react';
import firebase from "firebase";
import 'firebase/auth';
import 'firebase/database';
import './App.css';
import Navbar from './components/navbar/Navbar';
import SearchBar from "./components/Searchbar/searchbar";
import PostNavigationPage from './PostNavigationPage';
import CreatePostPage from './CreatePostPage';
import DetailedPostPage from './DetailedPostPage';
import HomePage from './HomePage';
import {Switch, Route} from 'react-router-dom';


export default class App extends Component {
  constructor(props) {
    super(props);
    //this.signedIn = this.signedIn.bind(this);
    //var user = new LoginController(this.signedIn);
    this.state = {
      user: null,
      loading: false,
      firstName: "",
      lastName: ""
    }
  }

  handleSignIn = () => {
   
  }

  handleSignOut = () => {
    firebase.auth().signOut().then(function() {
      //console.log("sign out successfull")
    }).catch(function(error) {
      // An error happened.
    });
  }
  componentDidMount() {
    this.authUnsubFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        let nameArr = firebaseUser.displayName.split(' ');
      firebase.firestore().collection('users').doc(firebaseUser.uid).set(
        {
          firstName: nameArr[0],
          lastName: nameArr[nameArr.length - 1],
          email: firebaseUser.email,
        }
      ).then(() => {
        console.log('finished');
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
    firebase.auth().signOut().then(function() {
      //console.log("sign out successfull")
    }).catch(
      (error) => {
        this.setState({errorMessage : error.message});
      }
    );
  }

  render() {
    let signedIn = false;
    let navbar = (
      <Navbar loggedIn={false} handleSignOut={this.handleSignOut}/>
    );
    if (this.state.user) {
      navbar = <Navbar loggedIn={true} handleSignOut={this.handleSignOut}/>
      signedIn = true;
    }
    return (
      <div>
        <header>
          {navbar}
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
            <CreatePostPage user={this.state.user}/>
          </Route>
          <Route path="/posts/:pid">
            <DetailedPostPage user={this.state.user} firstName={this.state.firstName} lastName={this.state.lastName}/>
          </Route>
        </Switch>
      </div>
    )
  }
}
