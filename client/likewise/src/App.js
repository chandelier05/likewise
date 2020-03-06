import React, {Component} from 'react';
import './App.css';
import Navbar from './components/navbar/Navbar';
import Section1 from './components/section1/index';
import Significance from './components/section2/Significance';
import Footer from './components/footer/Footer';
import GoogleLogin from 'react-google-login';

// function App() {
//   return (
//     <div>
//       <header>
//         <Navbar/>
//       </header>
//       <div className="homepage">
//         <Section1/>
//         <Significance/>
//       </div>
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
    <GoogleLogin
      clientId="691783787003-ec0rhkknvm5708q8bdgdae87qv9h29nc.apps.googleusercontent.com"
      buttonText="Login"
      onSuccess={responseGoogle}
      onFailure={responseGoogle}
      cookiePolicy={'single_host_origin'}
    />
  )
}
