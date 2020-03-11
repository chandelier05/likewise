import React, {Component} from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Section1 from './components/section1/index';
import Significance from './components/section2/Significance';
import Footer from './components/footer/Footer';
import GoogleLogin from 'react-google-login';
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
