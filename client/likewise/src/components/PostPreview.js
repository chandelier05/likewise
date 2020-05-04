import React from 'react';
import { makeStyles} from '@material-ui/core/styles';
import {ReactComponent as ClockIcon} from '../assets/clock.svg';
import examplePicture from '../assets/userImg.PNG';
import {ReactComponent as CommentBoxIcon} from '../assets/commentBoxIcon.svg';
import {
  Link
} from "react-router-dom";
import {firestore as db} from '../utils/firebase';
import PostDropdown from './PostDropdown';

const useStyles = makeStyles(theme => ({
  cardArea: {
    display: "flex",
    border: "2px solid #9188AB",
    borderRadius: "4px",
    zIndex: "1",
    alignItems: 'stretch'
  },
  userImg: {
    width: "10em",
    minWidth: '15em',
    textAlign: 'center',
    margin: '2em 2em',
  },
  detailBox: {
    display: 'flex',
    order: 2,
    flex: '2 0 auto',
    flexDirection: 'column',
    fontStyle: "italic",
    fontWeight: "normal",
    fontSize: "1.2em",
    justifyContent: 'space-between',
    margin: '2em 2em'
  },
  utilityRow : {
    display: 'flex',
    flexDirection: 'row',
    flex: '0 1 auto'
  },
  detailGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    margin: "0em 7em 0em 0em",
    "& p" : {
      color: "#707070",
      margin: "0em"
    },
  },
  images: {
    width: "2em",
    height: "2em",
    textAlign: "center",
    margin: "5% auto"
  },
  button: {
    margin: "0em 70em 0em 0em",
    backgroundColor:"transparent",
    borderRadius:"6px",
    border:"2px solid #B5D0EC",
    display:"inline-block",
    color:"#000000",
    fontWeight:"bold",
    padding:"10px 31px",
    textDecoration:"none",
    "&:active": {
      position:"relative",
      top:"1px",
    },
    fontSize: "1.2em"
  }
}));

export default function PostPreview(props) {
  const classes = useStyles();
  const postData = props.postData;
  const userImg = examplePicture;
  const major = "Informatics";
  const points = 1200;
  const username = props.firstName + " " + props.lastName;
  const handleClick = (e) => {
    if (e.target.name === 'optionsButton' || e.target.name === 'editPostButton' || e.target.name ==='deletePostButton') {
      e.preventDefault();
      e.stopPropagation();
    }
  }
  const handleDelete = (event) => {
    if (postData.uid == props.currentUserUid) {
      db.collection("posts").doc(postData.pid).delete().then(() => {
        console.log("Document deleted");
      }).catch((e) => {
        console.log("error emoving doc in postpreview", e);
      })
      db.collection("users").doc(props.currentUserUid).collection('posts').doc(postData.pid).delete().then(() => {
        console.log("Document deeted");
      }).catch((e) => {
        console.log("error emoving doc from users in postpreview", e);
      })
      props.setParent(postData.pid);
    }
  }
  return (
    <div className={props.className}>
      <Link to={"/posts/" + postData.pid} className={classes.cardArea} onClick={handleClick}>
        <img src={userImg} className={classes.userImg}/>
        <div className={classes.detailBox}>
          <h2 id="post-preview-header">
            {postData.preview}
          </h2>
          <div className={classes.utilityRow}>
            <div className={classes.detailGroup}> 
              <ClockIcon className={classes.images}/>
              <p>{getDate(postData.timestamp)}</p>
            </div>
            <div className={classes.detailGroup}> 
              <CommentBoxIcon className={classes.images}/>
              <p>{postData.commentCount ? postData.commentCount : 0} Comments</p>
            </div>
            { postData.uid === props.currentUserUid ?
              <div className={classes.detailGroup}> 
                <PostDropdown handleDelete={handleDelete} pid={postData.pid}/>
              </div> : <div></div>
            }
          </div>
        </div>
      </Link>
    </div>
  )
}

function getDate(timestamp) {
  let stringArr = timestamp.split(' ');
  return stringArr[1] + " " + stringArr[2] + " " + stringArr[3];
}

// width: 60vw;
//     min-width: 360px;
//     text-align: center;
//     margin: 5% auto;
//     background-color: #ccc;