import React, { Component } from 'react';
import { Container, Button, Grid, Typography } from '@material-ui/core';
import './style.css';
import landing1 from "../../../assets/landing1.png";
import landing2 from "../../../assets/landing2.png";

export default class Significance extends Component {
    //let classes = useStyles();
    render() {
        return (
            <div>
                <div className="purple">
                    <h2> Have you ever felt <span id="changeText">sad</span>?</h2>
                    <h3 style={{ fontStyle: "italic" }}>
                        Many of us have too.
                    </h3>
                    <p>
                        Likewise was created to be a safe space for students at UW to share the hardships
                        they face along with the happy experiences that they have. We want you to be able to
                        connect with others like you so that our UW community can help you overcome any difficulties
                        you may be facing together. By making posts and responding with your advice,
                        opinions and experiences, we can also help those who are too afraid to speak up and share.
                    </p>
                </div>
                <div className="white">
                    <Typography variant="h4">How does Likewise work?</Typography>
                    <div style={{
                        padding: "35px"
                    }}>
                        <Container>
                            <Grid container item md={12} className="work">
                                <Grid container item md={5}>
                                    <Typography variant="h4">
                                    Make a posts
                                    </Typography>
                                    <Typography style={{fontSize:"24px"}}>
                                    Have a question or concern? Or maybe some useful advice you want to share? Make a post effortlessly.
                                    </Typography>
                                </Grid>
                                <Grid container item md={2}><div></div></Grid>
                                <Grid container item md={5}><img src={landing1} alt="landing page image" className="landing"/></Grid>
                            </Grid>
                            <Grid container item md={12} className="work" style={{marginTop:"16px"}}>
                                <Grid container item md={5}>
                                <Typography variant="h4">
                                        Then get feedback from our supportive community
                                    </Typography>
                                    <Typography style={{fontSize:"24px"}}>
                                    Get thoughtful responses from fellow UW students who have gone through the same experiences.
                                    </Typography>
                                </Grid>
                                <Grid container item md={2}><div></div></Grid>
                                <Grid container item md={5}><img src={landing2} alt="landing page image"className="landing"/></Grid>
                            </Grid>
                        </Container>
                    </div>
                </div>
                <Grid container className="purple" style={{ textAlign: "center", height: "100%" }} justify="center">
                    <Grid item spacing={4} style={{ padding: "0px 40px" }}>
                        <h2 style={{ display: "inline-flex" }}>
                            Are you ready to start sharing?
                            </h2>
                    </Grid>
                    <Grid item spacing={4} style={{ padding: "10px 0px 40px" }}>
                        <Button variant="contained" style={{
                            display: "inline-flex",
                            color: "#FFFFFF", backgroundColor: "#000000", padding: "1rem"
                        }}>Join the community</Button>
                    </Grid>
                </Grid>
            </div>
        );
    }

}