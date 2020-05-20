import React, {useState, useEffect, useContext} from 'react';
import UserPicture from './UserPicture';
import examplePicture from '../assets/userImg.PNG';
import {Grid, Box, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CreateReply from'./CreateReply';
import Report from './Report';
import {firestore as db} from '../utils/firebase';
import {UserContext} from '../providers/firebaseUser';

const useStyles = makeStyles(theme => ({
  root : {
    margin: "0rem 0rem 2rem",
    flexDirection: "column",
    display: "flex",
    overflow: "auto",
    fontSize: "1.2rem"
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
    flexDirection: "row"
  },
  emptyDiv: {
    margin: '0rem 0rem 0rem 6.5rem'
  }
}));

export default function Comment(props) {
  const [closeReply, setReply] = useState(true);
  const [report, setReport] = useState(false);
  const [loading, setLoad] = useState(true);
  const [avatarData, setAvatarData] = useState({
    username: "deleted"
  });
  const user = useContext(UserContext);
  const userRef = db.collection('users').doc(props.commentUid);
  const classes = useStyles();
  const userImg = examplePicture;
  const major = "Informatics";
  const handleReply = () => {
    setReply(!closeReply);
  }
  const commentReply = () => {
    setReply(!closeReply);
    props.setParent();
  }
  const setReportDisplay = () => {
    setReport(!report);
  };
  const deleteComment = () => {
    db.collection('comments').doc(props.cid).update({
      body : "deleted",
      firstName: "delete",
      uid: "delete",
      lastName: " " ,
      deleted: "TRUE"
    }).then(() => {
      window.location.reload(false);
    })
  }
  useEffect(() => {
    userRef.get().then((doc) => {
      let tempAvatarData = {};
      if (!props.deleted) {
        if (doc.exists) {
          tempAvatarData.username = doc.data().firstName + ' ' + doc.data().lastName;
          tempAvatarData.likes = doc.data().likes;
        } else {
          console.log('user does not exist, comment');
        }
        setAvatarData(tempAvatarData);
      }
    }).catch((e) => {
      console.log(e);
    })
    setLoad(false);
  }, [])
  return (
    <div className={classes.root}>
      <Grid container className={classes.post} style={{flexWrap:"noWrap"}}>
        {
          !loading && !props.empty ? <Grid item xs={2} style={{margin:"0rem 1rem 0rem 0rem"}}>
          <UserPicture imgSrc={userImg} major={major} points={avatarData.likes} username={avatarData.username} deleted={props.deleted}/>
          </Grid> : <div className={classes.emptyDiv}></div>
        }
        <Grid item xs={10}>
          <Box className={classes.postOutline}>
              <p>
                  {props.body}
              </p>
              {
                !props.empty ?
                <div>
                  <p style={{fontSize: "0.8rem"}}>{props.timestamp}</p>
                  {
                    !props.deleted ? 
                    <div style={{display: "inline-block"}}>
                    {
                      !props.commentReply ? 
                      <button onClick={handleReply} className='reply-button'>Reply</button>
                      :
                      <div></div>
                    }
                    <button className='report-button' onClick={setReportDisplay}>Report</button>
                    {user.uid === props.commentUid ? <button className='delete-button' onClick={deleteComment}>Delete</button> : <div></div>}
                    </div> : <div></div>
                  }
                </div> : <div></div>
              }
          </Box>
        </Grid>
      </Grid>
        <Grid container className={classes.reply}>
          <Grid item xs={12}>
            {
              closeReply ? <div></div> : 
              <CreateReply parentId={props.parentId} setParent={commentReply} 
              firstName={props.firstName} lastName={props.lastName} postId={props.postId} commentCount={props.commentCount}/>
            }
            {
              report ? <Report setParent={setReportDisplay} pid={props.postId} uid={props.uid} type="comment"/> : <div></div>
            }
          </Grid>
        </Grid>
      </div>
  )
}