import React, { useState, useContext } from 'react';
import './style.css';
import Button from '@material-ui/core/Button';
import feature1 from '../../../assets/icons for website-01.svg';
import feature2 from '../../../assets/icons for website-02.svg';
import feature3 from '../../../assets/icons for website-03.svg';
import {Redirect} from 'react-router-dom';
import {UserContext} from '../../../providers/firebaseUser';

function Section1(props) {
    const [redirect, setRedirect] = useState(false);
    const [redirectCreate, setCreate] = useState(false);
    const user = useContext(UserContext);
    const handleClick = () => {
        setRedirect(true);
    }

    const handleCreate = () => {
        setCreate(true);
    }

    if (redirect) {
        return (
            <Redirect to="/posts"/>
        )
    } else if (redirectCreate) {
        return (
            <Redirect to="createPost"/>
        )
    } else {
        return(
            <div className="container">
                <div className="connect">
                    <h1 id="home-header">Connect with fellow UW students and see what they're experiencing</h1>
                    {
                        user !== "logout" ? 
                        <div className='home-buttons-row'>
                            <Button variant="contained" id="browsePosts" size="large" onClick={handleClick}>Browse Posts</Button>
                            <Button variant="contained" id="createPosts" size="large" onClick={handleCreate}>Create a Post</Button>
                        </div> : <div></div>
                    }
                </div>
                <div className="home-icons-row">
                    <img src= {feature1} alt="first feature"/>
                    <img src= {feature2} alt="first feature"/>
                    <img src= {feature3} alt="first feature"/>
                </div>
            </div>
        )
    }
}

export default Section1;