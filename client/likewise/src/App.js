import React, {useContext} from 'react';
import {signInWithGoogle} from "./utils/firebase";
import Navbar from './components/navbar/Navbar';
import PostNavigationPage from "./pages/PostNavigationPage/PostNavigationPage";
import CreatePostPage from "./pages/CreatePostPage/CreatePostPage";
import DetailedPostPage from './pages/DetailedPostPage/DetailedPostPage'
import HomePage from './pages/HomePage/HomePage';
import AccountPage from './pages/AccountPage/AccountPage';
import {Switch, Route, Redirect} from 'react-router-dom';
import {UserContext} from './providers/firebaseUser';

export default function App(props) {
    const user = useContext(UserContext);
    // TODO: REPLACE WITH LOADING ANIMATION
    if (user === "loading") {
      return (
        <div>I'm Loading!</div>
      )
    }
    let navbar = (
      <Navbar signInCallback={signInWithGoogle}/>
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
    if (user) {
      navbar = <Navbar signInCallback={signInWithGoogle}/>
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
              <CreatePostPage/>
            </Route>
            <Route path="/posts/:pid">
              <DetailedPostPage/>
            </Route>
            <Route path="/account">
              <AccountPage/>
            </Route>
            <Redirect to="/"/>
          </Switch>
        </div>
      );
    }
    return body;
}


  // handleSignIn = () => {
    // var provider = new firebase.auth.GoogleAuthProvider();
    // // TODO: WHY IS THEN() NOT CALLED?
    // // guess it's the problem of the setState function?
    // var userInfo = firebase.auth().signInWithPopup(provider).then(function(result) {
    //   // this.setState({user: result.user});
    // }).catch(function(error) {
    //     var errorCode = error.code;
    //     var errorMessage = error.message;
    //     // The email of the user's account used.
    //     var email = error.email;
    //     // The firebase.auth.AuthCredential type that was used.
    //     var credential = error.credential;
    // })
  // }

  // componentDidMount() {
    // this.setState({loading: true})
    // this.authUnsubFunction = firebase.auth().onAuthStateChanged((firebaseUser) => {
    //   if (firebaseUser) {
    //     console.log("setting firebase user state");
    //     let nameArr = firebaseUser.displayName.split(' ');
    //     firebase.firestore().collection('users').doc(firebaseUser.uid).set(
    //       {
    //         firstName: nameArr[0],
    //         lastName: nameArr[nameArr.length - 1],
    //         email: firebaseUser.email,
    //       }
    //     ).then(() => {
    //       let nameArr = firebaseUser.displayName.split(' ');
    //       this.setState({user: firebaseUser, loading: false, firstName: nameArr[0], lastName: nameArr[nameArr.length - 1]});
    //     }).catch((e) => {
    //       console.log(e);
    //     })
    //   } else {
    //     this.setState({user: null, loading: false});
    //   }
    // });
  // }

  // componentWillUnmount() {
  //   //this.authUnsubFunction();
  //   this.setState({errorMessage: null});
  // }
    // if (this.state.loading) {
    //   return (
    //     <div>
    //       I'm Loading!
    //     </div>
    //   )
    // }