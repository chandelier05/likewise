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
    overflow: "auto",
    flexWrap: "noWrap"
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
    const handleReport = () => {
      props.reportHandler();
    }
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
          <Grid container className={classes.post}>
            <Grid item xs={2} style={{margin: "0rem 1rem 0rem 0rem"}}>
              <UserPicture imgSrc={userImg} major={major} points={points} username={props.postData.firstName + " " + props.postData.lastName}/>
            </Grid>
            <Grid item xs={10}>
            <Box className={classes.postOutline}>
              <h3 className={classes.summary}>
                {props.postData.preview}
              </h3>
              <p>
                {props.postData.body}
              </p>
              <p className={classes.timestamp}>{timestamp}</p>
              <Button variant="outlined" style={{border: "solid 1px #9188AB", margin: "0rem 1rem"}} onClick={handleClick}>Reply</Button>
              <Button variant="contained" style={{backgroundColor: "#9188AB", margin: "0rem 1rem"}} onClick={handleReport}>Report</Button>
            </Box>
            </Grid>
          </Grid>
        </div>
    )
    }
    
}