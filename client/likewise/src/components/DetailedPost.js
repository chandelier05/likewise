import React, {useState, useEffect} from 'react';
import UserPicture from './UserPicture';
import examplePicture from '../assets/userImg.PNG';
import {Grid, Box, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {firestore as db} from '../utils/firebase';

const useStyles = makeStyles(theme => ({
  root : {
    fontSize: "1.2rem",
    margin: '0rem 0rem 4rem 0rem'
  },
  summary: {
    fontWeight: "bold",
    fontSize: "1.4rem", 
    color: "#9188AB"
  },
  postOutline: {
    borderRadius: "0.5em",
    border: "0.15em solid transparent",
    background: 'linear-gradient(#fff,#fff) padding-box, linear-gradient(to right, #88B5E1, #9188AB) border-box',
    borderImageSlice: 1,
    padding: "1rem",
    flexDirection: "row"
  },
  post: {
    display: "flex",
    overflow: "auto",
    flexWrap: "noWrap"
  },
  timestamp: {
    fontSize: "0.8rem"
  },
  replyButton: {
    
  }
}));

export default function DetailedPost(props) {
    const classes = useStyles();
    const userImg = examplePicture;
    const major = "Informatics";
    const [loading, setLoad] = useState(true);
    const [avatarData, setAvatarData] = useState({});
    const userRef = db.collection('users').doc(props.postData.uid);
    const handleClick = () => {
      props.setParent();
    };
    const handleReport = () => {
      props.reportHandler();
    }
    useEffect(() => {
    userRef.get().then((doc) => {
      let tempAvatarData = {};
      if (doc.exists) {
        tempAvatarData.username = doc.data().firstName + ' ' + doc.data().lastName;
        tempAvatarData.likes = doc.data().likes;
      } else {
        console.log('user does not exist, comment');
      }
      setAvatarData(tempAvatarData);
    }).catch((e) => {
      console.log(e);
    })
    setLoad(false);
  }, [])
    // TO-DO replace empty div with loading screen
    if (props.test) {
      return (
        <div></div>
      )
    } else {
      let timestamp = props.postData.timestamp;
      timestamp = timestamp.toDate().toString();
      return (
        <div className={classes.root}>
          <Grid container className={classes.post}>
            <Grid item xs={2} style={{margin: "0rem 1rem 0rem 0rem"}}>
              {!loading ? 
                <UserPicture imgSrc={userImg} major={major} points={avatarData.likes} username={avatarData.username}/>
                : <div></div>
              }
            </Grid>
            <Grid item xs={10}>
            <Box className={classes.postOutline}>
              <h2 className={classes.summary}>
                {props.postData.preview}
              </h2>
              <p>
                {props.postData.body}
              </p>
              <p className={classes.timestamp}>{timestamp}</p>
              <button className='reply-button' onClick={handleClick}>Reply</button>
              <button className='report-button' onClick={handleReport}>Report</button>
            </Box>
            </Grid>
          </Grid>
        </div>
    )
    }
    
}