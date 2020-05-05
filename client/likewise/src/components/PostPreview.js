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
import {ReactComponent as LikeButton} from '../assets/comment-like-button.svg';
import DividerLine from '../assets/post-preview-line-break.svg';

const useStyles = makeStyles(theme => ({
  cardArea: {
    display: "flex",
    border: "0.2em solid transparent",
    borderRadius: "1em",
    zIndex: "1",
    alignItems: 'stretch',
    flexDirection: 'row',
    background: 'linear-gradient(#fff,#fff) padding-box, linear-gradient(to right, #88B5E1, #9188AB) border-box',
    borderImageSlice: 1
  },
  userImg: {
    width: "10em",
    height: 'auto',
    minWidth: '15em',
    textAlign: 'center',
    margin: '2em 2em'
  },
  detailBox: {
    display: 'flex',
    order: 2,
    flex: '2 1 auto',
    flexDirection: 'column',
    fontStyle: "italic",
    fontWeight: "normal",
    fontSize: "1.2em",
    justifyContent: 'space-between',
    margin: '2em 8em 2em 2em',
    width: '46em',
    "& h2" : {
      flex: '1 1 5em'
    }
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
    margin: "5% auto",
    transform: 'scale(-1,1)'
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
  },
  likeButton : {
    width: '5em',
    height: '5em',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    border: 'none',
    "&:>*" : {
      pointerEvents: "none"
    }
  },
  likeSection : {
    display: 'flex',
    order: 3,
    flex: '1 1 7em',
    flexDirection: 'row',
    fontWeight: "normal",
    fontSize: "1.2em",
    justifyContent: 'space-evenly',
    margin: '2em 2em',
    alignItems: 'center'
  },
  dividerLine : {
    height: '100%',
    margin: '0em 1em'
  },
  likeBox : {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    fontStyle: 'italic',
    fontWeight: 'bold',
    lineHeight: '156%',
    color: '#707070'
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
    if (
      e.target.name === 'optionsButton' || e.target.name === 'editPostButton' 
      || e.target.name === 'deletePostButton' || e.target.name === 'likeButton'
    ) {
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
        <div className={classes.likeSection}>
          <img src={DividerLine} className={classes.dividerLine}/>
          <div className={classes.likeBox}>
            <button className={classes.likeButton} name="likeButton">
              <LikeButton />
            </button>
            <p>{postData.likes}</p>
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