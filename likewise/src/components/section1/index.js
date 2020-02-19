import React, { Component } from 'react';
import './style.css';
import Button from '@material-ui/core/Button';
import feature1 from '../../assets/Feature1.png';
import feature2 from '../../assets/Feature2.png';
import feature3 from '../../assets/Feature3.png';

class index extends Component {
    render(){
        return(
            <div>
                <div className="connect">
                    <h1>Connect with fellow UW students and see what they're experiencing</h1>
                    <Button variant="contained" id="signup" size="large" >Join the Community</Button>
                </div>
                <div className="icons">
                    <img src= {feature1} alt="first feature"/>
                    <img src= {feature2} alt="first feature"/>
                    <img src= {feature3} alt="first feature"/>
             
                </div>
            </div>
            
            
        )
    }
}

export default index;