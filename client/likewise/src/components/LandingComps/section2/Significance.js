import React, {Component} from 'react';
import {Container, Typography, Grid, makeStyles} from '@material-ui/core';
import TextLoop from 'react-text-loop';
import {HomePageTextLoopArr} from '../../../utils/constants';
import {signInWithGoogle} from "../../../utils/firebase";
import landing1 from "../../../assets/landing1.png";
import landing2 from "../../../assets/landing2.png";
import './style.css';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      padding: "1.2rem",
      margin: '0rem 2rem'
    },
    postSection: {
      "&:first-child": {
        margin: "0rem 2rem 1rem 2rem"
      }
    },
    header: {
      margin: "0rem 1rem",
      fontSize: "3rem",
      background: "rgb(136,181,225)",
      background: "linear-gradient(90deg, rgba(136,181,225,1) 0%, rgba(145,136,171,1) 25%)",
      WebkitTextFillColor: "transparent",
      WebkitBackgroundClip: "text",
      fontFamily: "Roboto",
      fontStyle: "normal",
      fontWeight: "900"
    }
  }))

  const styles = {
      header1:{
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "900",
        fontSize: "36px",
        lineHeight: "56px",
      },
      header2:{
            background: "rgb(136,181,225)",
            background: "linear-gradient(90deg, rgba(136,181,225,1) 0%, rgba(145,136,171,1) 25%)",
            WebkitTextFillColor: "transparent",
            WebkitBackgroundClip: "text",
            fontFamily: "Roboto",
            fontStyle: "normal",
            fontWeight: "900",
            lineHeight: "56px",
      },
      description:{
        fontFamily: "Roboto",
        fontStyle: "normal",
        fontWeight: "normal",
        fontSize: "24px",
        lineHeight: "182.7%",
        color: "black",
      },
  }

export default class Significance extends Component {

    handleLogin = (event) => {
        event.preventDefault();
        signInWithGoogle();
    };

    render(){
        return (
            <div>
                <div className="purple">
                        <h2> Have you ever felt <TextLoop children={HomePageTextLoopArr}/>?</h2>
                    <h3 style={{fontStyle: "italic", fontSize: '1.4rem', color: "white"}}>
                        Many of us have too.
                    </h3>
                    <p className="likewise-description">
                    Likewise was created to be a safe space for students at UW to share the hardships 
                    they face along with the happy experiences that they have. We want you to be able to 
                    connect with others like you so that our UW community can help you overcome any difficulties 
                    you may be facing together. By making posts and responding with your advice,
                    opinions and experiences, we can also help those who are too afraid to speak up and share.

                    Likewise was created as a capstone project. 
                    <a href='https://github.com/chandelier05/likewise' target='_blank'>You can find the repository here.</a>
                    </p>
                </div>
                <div className="white">
                    <Typography variant="h4" style={styles.header1}>How does Likewise work?</Typography>
                    <div style={{
                        padding: "35px"
                    }}>
                        <Container>
                            <Grid container item md={12} className="work">
                                <Grid container item md={5}>
                                    <Typography variant="h4" style={styles.header2}>
                                    Make a posts
                                    </Typography>
                                    <Typography style={styles.description}>
                                    Have a question or concern? Or maybe some useful advice you want to share? Make a post effortlessly.
                                    </Typography>
                                </Grid>
                                <Grid container item md={2}><div></div></Grid>
                                <Grid container item md={5}><img src={landing1} alt="landing page image" className="landing"/></Grid>
                            </Grid>
                            <Grid container item md={12} className="work" style={{marginTop:"16px"}}>
                                <Grid container item md={5}>
                                <Typography variant="h4" style={styles.header2}>
                                        Then get feedback from our supportive community
                                    </Typography>
                                    <Typography style={styles.description}>
                                    Get thoughtful responses from fellow UW students who have gone through the same experiences.
                                    </Typography>
                                </Grid>
                                <Grid container item md={2}><div></div></Grid>
                                <Grid container item md={5}><img src={landing2} alt="landing page image"className="landing"/></Grid>
                            </Grid>
                        </Container>
                    </div>
                </div>
                <div className="join-community-row">
                    <h2>
                        Are you ready to start sharing?
                    </h2>
                    <Button onClick={this.handleLogin}>Join the community</Button>
                </div>
            </div>
        );
    }

}