import React, {useContext} from 'react';
import {FirebaseContext} from '../utils/firebase';
import { makeStyles} from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import clock from '../assets/clock.png';
import commentBox from '../assets/commentBox.png';
import 'firebase/firestore';
import {
  Link
} from "react-router-dom";

const useStyles = makeStyles(theme => ({
  card: {
    display: 'flex',
    padding: "2rem 1rem",
    '&:last-child': {
        paddingBottom: "2rem",
      },
    order: 1,
    boxShadow: "none"
  },
  postTextBox: {
    display: 'flex',
    flexDirection: 'column'
  },
  content: {
    flex: '2 0 auto',
    padding: '0rem 1rem',
    '&:last-child': {
        paddingBottom: '3.5rem',
      },
  },
  cover: {
    width: "5rem",
    height: "5rem",
    margin: "0rem 0.5rem",
  },
  cardArea: {
    display: "flex",
    flexDirection: 'column',
    border: "2px solid #9188AB",
    borderRadius: "4px",
    flexWrap: "wrap",
    zIndex: "1",
    position: "relative"
  },
  detailRow: {
    display: 'flex',
    order: 2,
    flex: '1 2 auto',
    flexDirection: 'row',
    fontFamily: "Roboto",
    fontStyle: "italic",
    fontWeight: "normal",
    fontSize: "1.2rem",
    
    padding: "1rem",
    alignItems: "center",
    justifyContent: "space-between"
  },
  detailGroup: {
    display: 'flex',
    flexDirection: 'row',
    margin: "0rem 0rem 0rem 7rem",
    "& p" : {
      padding: "1.25rem 0rem 0.5rem",
      color: "#707070"
    },
  },
  images: {
    maxWidth: "4rem",
    maxHeight: "4rem",
    width: "auto",
    height: "auto",
  },
  commentImg: {
    margin: "0rem 4rem",
    maxWidth: "2rem",
    maxHeight: "2rem",
    width: "auto",
    height: "auto"
  },
  button: {
    margin: "0rem 70rem 0rem 0rem",
    backgroundColor:"transparent",
    borderRadius:"6px",
    border:"2px solid #B5D0EC",
    display:"inline-block",
    cursor:"pointer",
    color:"#000000",
    fontWeight:"bold",
    padding:"10px 31px",
    textDecoration:"none",
    "&:hover": {
      backgroundColor:"transparent",
    },
    "&:active": {
      position:"relative",
      top:"1px",
    },
    fontFamily: "Roboto",
    fontSize: "1.2rem",
    zIndex: "3"
  }
}));

export default function PostPreview(props) {
  const firebase = useContext(FirebaseContext);
  const classes = useStyles();
  const postData = props.postData;
  const db = firebase.firestore();
  const handleClick = (e) => {
    if (e.target.name === 'replyButton') {
      e.preventDefault();
      e.stopPropagation();
    }
  }
  const handleDelete = (event) => {
    if (postData.uid == props.currentUserUid) {
      db.collection("posts").doc(postData.pid).delete().then(() => {
        console.log("Document deleted");
      }).catch((e) => {
        console.log("error removing doc in postpreview", e);
      })
      db.collection("users").doc(props.currentUserUid).collection('posts').doc(postData.pid).delete().then(() => {
        console.log("Document deeted");
      }).catch((e) => {
        console.log("error removing doc from users in postpreview", e);
      })
      props.setParent(postData.pid);
    }
  }
  return (
    <div className={props.className}>
      <Link to={"/posts/" + postData.pid} className={classes.cardArea} onClick={handleClick}>
        <Card className={classes.card}>
          <CardMedia
              className={classes.cover}
              image={props.userImg}
              title="Picture of user"
          />
          <div className={classes.postTextBox}>
              <CardContent className={classes.content}>
                  <Typography component="h2" style={{padding: "0px 10px"}}>
                      {postData.preview}
                  </Typography>
                  <Typography component="p" style={{padding: "0px 10px"}}>
                      {postData.body}
                  </Typography>
              </CardContent>
          </div>
        </Card>
        <div className={classes.detailRow}>
          <div className={classes.detailGroup}> 
            <img src={clock} className={classes.images}/>
            <p>{getDate(postData.timestamp)}</p>
          </div>
          <div className={classes.detailGroup}> 
            <img src={commentBox} className={classes.commentImg}/>
            <p>{postData.commentCount}</p>
          </div>
          <button id="reply-button-post-preview" class={classes.button} onClick={handleDelete} name="replyButton">Reply</button>
        </div>
      </Link>
    </div>
  )
}

function getDate(timestamp) {
  let stringArr = timestamp.split(' ');
  return stringArr[1] + " " + stringArr[2] + " " + stringArr[3];
}