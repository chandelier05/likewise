import React, {Component} from 'react';
import firebase from "firebase";
import 'firebase/auth';
import 'firebase/database';
import './App.css';
import Navbar from './components/navbar/Navbar';
import GoogleLogin from 'react-google-login';

import Section1 from './components/LandingComps/section1/index';
import Significance from './components/LandingComps/section2/Significance';
import Footer from './components/LandingComps/section3/Footer';
import SearchBar from "./components/Searchbar/searchbar";
import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";

import Container from '@material-ui/core/Container';
import PostNavigationPage from './PostNavigationPage';
import CreatePostPage from './CreatePostPage';
import UserPicture from './components/UserPicture';
import circle from './assets/userImg.PNG';
import DetailedPostPage from './DetailedPostPage';

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

export default function App() {
  const responseGoogle = (response) => {
    console.log(response);
  }
  return (
    <DetailedPostPage/>
  )
}


// class App extends Component {
//   state = { isSignedIn: false};
//   uiConfig = { 
//     signInFlow: "popup", 
//     SignInOptions: [
//       firebase.auth.GoogleAuthProvider.PROVIDER_ID
//     ], 
//     callbacks: {
//       signInSuccess: () => false
//     }
//   };

//   componentDidMount = () =>{

//     firebase.auth().onAuthStateChanged(user => {
//       this.setState({isSignedIn:!!user})
//       console.log("user", user)
//     })
//   }

//   render(){
//     return (
//       <div>
//         <header>
//           <Navbar/>
//           <StyledFirebaseAuth
//           uiConfig={this.uiConfig}
//           firebaseAuth={firebase.auth()}/>
//           <SearchBar/>
//         </header>
//         {this.state.isSignedIn ? (
//           <div>Signed In!</div>
//         ) : (<>
//           <div className="homepage">
//           <Section1/>
//           <Significance/>
//           </div>
//           <footer>
//           <Footer/>
//           </footer>
//           </>)}
//       </div>
//     );
//   }
// }
// export default App
