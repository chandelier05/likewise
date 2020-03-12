import React from 'react';
import Section1 from './components/LandingComps/section1/index';
import Significance from './components/LandingComps/section2/Significance';
import Footer from './components/LandingComps/section3/Footer';

export default function HomePage(props) {
  return (
    <div>
    {props.isSignedIn ? (
      <div>Signed In!</div>
      ) : (<>
      <div className="homepage">
      <Section1/>
      <Significance/>
      </div>
      <footer>
      <Footer/>
      </footer>
      </>
    )}
    </div>
  )
}