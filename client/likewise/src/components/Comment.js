import React, {useState} from 'react';
import UserPicture from './UserPicture';
import examplePicture from '../assets/userImg.PNG';
import {Grid, Box, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CreateReply from'./CreateReply';

const useStyles = makeStyles(theme => ({
  root : {
    margin: "1rem",
    flexDirection: "column",
    display: "flex",
    overflow: "auto"
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
  const [closeReply, setReply] = useState(true);
  const classes = useStyles();
  const userImg = examplePicture;
  const major = "Informatics";
  const points = 1200;
  const username = props.firstName + " " + props.lastName;
  const handleReply = () => {
    setReply(!closeReply);
  }
  const handleReport = () => {};
  return (
    <div className={classes.root}>
      <Grid container className={classes.post} style={{flexWrap:"noWrap"}}>
        <Grid item xs={2} style={{margin:"0rem 1rem 0rem 0rem"}}>
          <UserPicture imgSrc={userImg} major={major} points={points} username={username}/>
        </Grid>
        <Grid item xs={12}>
          <Box className={classes.postOutline}>
              <p>
                  {props.body}
              </p>
              <p style={{fontSize: "0.6rem"}}>{props.timestamp}</p>
              <div style={{display: "inline-block"}}>
                <Button variant="outlined" style={{border: "solid 1px #9188AB", margin: "0rem 1rem", letterSpacing: "0"}} onClick={handleReply}>Reply</Button>
                <Button variant="contained" style={{backgroundColor: "#9188AB", margin: "0rem 1rem", letterSpacing: "0"}} onClick={handleReport}>Report</Button>
              </div>
          </Box>
        </Grid>
      </Grid>
        <Grid container className={classes.reply}>
          <Grid item xs={12}>
            {
              closeReply ? <div></div> : 
              <CreateReply parentId={props.parentId} setParent={handleReply} 
              firstName={props.firstName} lastName={props.lastName} uid={props.uid}/>
            }
          </Grid>
        </Grid>
      </div>
  )
}