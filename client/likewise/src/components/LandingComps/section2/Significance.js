import React, {Component} from 'react';
import {Container, Button, Grid} from '@material-ui/core';
import './style.css';

export default class Significance extends Component{
    //let classes = useStyles();
    render(){
        return (
            <div>
                <div className="purple">
                        <h2> Have you ever felt <span id="changeText">sad</span>?</h2>
                    <h3 style={{fontStyle: "italic"}}>
                        Many of us have too.
                    </h3>
                    <p>
                    Likewise was created to be a safe space for students at UW to share the hardships 
                    they face along with the happy experiences that they have. We want you to be able to 
                    connect with others like you so that our UW community can help you overcome any difficulties 
                    you may be facing together. By making posts and responding with your advice,
                    opinions and experiences, we can also help those who are too afraid to speak up and share.

                    Likewise was created as a capstone project, and as such will not be maintained after June 1st.
                    We will be shutting down operations and deleting all stored personal data by June 1st.
                    <a href='https://github.com/chandelier05/likewise' target='_blank'>You can find the repository here.</a>
                    </p>
                </div>
                <div className="white">
                    <h2>
                        How does Likewise work?
                    </h2>
                    <div style={{
                            padding: "35px"}}>
                        <Container style={{background: "#FFFFFF",
                            border: "1px solid #000000",
                            boxSizing: "border-box",
                            borderRadius: "4px",
                            width: "85vw",
                            height: "60vh"}}>
                        </Container>
                    </div>
                </div>
                    <Grid container className="purple" style={{textAlign: "center", height: "100%"}} justify="center">
                        <Grid item spacing={4} style={{padding: "0px 40px"}}>
                            <h2 style={{display: "inline-flex"}}>
                                Are you ready to start sharing?
                            </h2>
                        </Grid>
                        <Grid item spacing={4} style={{padding: "10px 0px 40px"}}>
                            <Button variant="contained" style={{display: "inline-flex",
                                color: "#FFFFFF", backgroundColor: "#000000", padding:"1rem"}}>Join the community</Button>
                        </Grid>
                    </Grid>
            </div>
        );
    }
   
}