import React from 'react';
import Section1 from '../../components/LandingComps/section1/Section1';
import Significance from '../../components/LandingComps/section2/Significance';
import Footer from '../../components/LandingComps/section3/Footer';
import {ShutDownBanner} from "../../components/Banner/Banner";
export default function HomePage(props) {
  return (
    <div>
      <div className="homepage">
      <ShutDownBanner/>
      <Section1/>
      <Significance/>
      </div>
      <footer>
      <Footer/>
      </footer>
    </div>
  )
}