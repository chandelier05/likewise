import React from 'react';
import UserPicture from './UserPicture';
import examplePicture from '../assets/userImg.PNG';
import {Grid, Box, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root : {

  },
  summary: {
    fontWeight: "bold",
    fontSize: "1rem", 
    color: "#9188AB"
  },
  postOutline: {
    border: "1px solid #9188AB",
    borderRadius: "4px",
    padding: "1rem"
  },
  post: {
    display: "flex",
  },
  timestamp: {
    fontSize: "0.6rem"
  }
}));

export default function DetailedPost(props) {
    const classes = useStyles();
    const userImg = examplePicture;
    const major = "Informatics";
    const points = 1200;
    //console.log(props.postData);
    const handleClick = () => {
      props.setParent();
    };
    // TO-DO replace empty div with loading screen
    if (props.test) {
      return (
        <div></div>
      )
    } else {
      let timestamp = props.postData.timestamp;
      timestamp = timestamp.toDate().toString();
      return (
        <div>
        <h1>Reflection (or Question)</h1>
            <Grid container class={classes.post}>
            <Grid item xs={2} style={{margin: "1rem"}}>
                <UserPicture imgSrc={userImg} major={major} points={points} username={props.postData.firstName + " " + props.postData.lastName}/>
            </Grid>
            <Grid item xs={10}>
            <Box class={classes.postOutline}>
                <h3 class={classes.summary}>
                  {props.postData.preview}
                </h3>
                <p>
                  {props.postData.body}
                </p>
                <p class={classes.timestamp}>{timestamp}</p>
                <Button variant="outlined" style={{border: "solid 1px #9188AB", margin: "0rem 1rem"}} onClick={handleClick}>Reply</Button>
                <Button variant="contained" style={{backgroundColor: "#9188AB", margin: "0rem 1rem"}}>Report</Button>
            </Box>
            </Grid>
            </Grid>
            </div>
    )
    }
    
}