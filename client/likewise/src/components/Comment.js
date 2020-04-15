import React from 'react';
import UserPicture from './UserPicture';
import examplePicture from '../assets/userImg.PNG';
import {Grid, Box, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CreateReply from'./CreateReply';

const useStyles = makeStyles(theme => ({
  root : {
    margin: "1rem",
    flexDirection: "column",
    display: "flex"
  },
  summary: {
    fontWeight: "bold",
    fontSize: "1rem", 
    color: "#9188AB"
  },
  postOutline: {
    border: "1px solid #9188AB",
    padding: "1rem",
    flexDirection: "row"
  },
  post: {
    display: "flex",
    flexDirection: "row"
  },
  reply: {
  }
}));

export default function Comment(props) {
    const classes = useStyles();
    const userImg = examplePicture;
    const major = "Informatics";
    const points = 1200;
    return (
      <div class={classes.root}>
        <Grid container class={classes.post}>
          <Grid item xs={2} style={{margin: "1rem"}}>
            <UserPicture imgSrc={userImg} major={major} points={points} username={props.username}/>
          </Grid>
          <Grid item xs={10}>
            <Box class={classes.postOutline}>
                <p>
                    {props.body}
                </p>
                <p style={{fontSize: "0.6rem"}}>{props.timestamp}</p>
                <div style={{display: "inline-block"}}>
                  <Button variant="outlined" style={{border: "solid 1px #9188AB", margin: "0rem 1rem", letterSpacing: "0"}}>Reply</Button>
                  <Button variant="contained" style={{backgroundColor: "#9188AB", margin: "0rem 1rem", letterSpacing: "0"}}>Report</Button>
                </div>
            </Box>
          </Grid>
        </Grid>
          <Grid container class={classes.reply}>
            <Grid item xs={12}>
              <CreateReply/>
            </Grid>
          </Grid>
        </div>
    )
}