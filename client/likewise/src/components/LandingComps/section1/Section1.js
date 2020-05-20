import React, { useState, useContext } from 'react';
import './style.css';
import Button from '@material-ui/core/Button';
import feature1 from '../../../assets/icons for website-01.svg';
import feature2 from '../../../assets/icons for website-02.svg';
import feature3 from '../../../assets/icons for website-03.svg';

import { Grid } from '@material-ui/core';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../../providers/firebaseUser';

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
            <Redirect to="/posts" />
        )
    } else if (redirectCreate) {
        return (
            <Redirect to="createPost" />
        )
    } else {
        return (
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

                <Grid container md={12} style={{ display: "flex", alignItems: "center" }} className="home-icons-row">
                    <Grid item md={1.5}>
                        <div></div>
                    </Grid>
                    <Grid item md={3} className="icon-item">
                        <img src={feature1} alt="first feature" />
                        <div>
                            <h4 className = "icon-title">Make a Post</h4>
                            <p className="icon-description">
                                Have a question or concern? <br/> There are fellow UW students <br/> looking out for you.
                            </p>
                        </div>
                    </Grid>
                    <Grid item md={3} className="icon-item">
                        <img src={feature2} alt="first feature" />
                        <div>
                            <h4 className = "icon-title">Build a Community</h4>
                            <p className="icon-description">
                                Find others who care and want <br/> to give you guidance by sharing <br/> their advice and experiences.
                            </p>
                        </div>
                    </Grid>
                    <Grid item md={3} className="icon-item">
                        <img src={feature3} alt="first feature" />
                        <div>
                            <h4 className = "icon-title">Explore experiences</h4>
                            <p className="icon-description">
                                Browse through existing Q&amp;As <br/> and find others that you can <br/> relate and connect with.
                            </p>
                        </div>
                    </Grid>
                    <Grid item md={1.5}>
                        <div></div>
                    </Grid>
                </Grid>
            </div>
        )
    }
}

export default Section1;