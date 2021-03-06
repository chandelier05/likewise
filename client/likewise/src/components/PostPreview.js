import React, {useState, useContext, useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {ReactComponent as ClockIcon} from '../assets/clock.svg';
import examplePicture from '../assets/userImg.PNG';
import {ReactComponent as CommentBoxIcon} from '../assets/commentBoxIcon.svg';
import {
  Link
} from "react-router-dom";
import {firestore as db, FieldValue} from '../utils/firebase';
import PostDropdown from './PostDropdown';
import {ReactComponent as LikeButton} from '../assets/comment-like-button.svg';
import DividerLine from '../assets/post-preview-line-break.svg';
import {UserContext} from '../providers/firebaseUser';
import EditPost from './EditPost';
import {PostPreviewIgnoreNames} from '../utils/constants';

const useStyles = makeStyles(theme => ({
  cardArea: {
    display: "flex",
    border: "0.2em solid transparent",
    borderRadius: "1em",
    zIndex: "1",
    alignItems: 'stretch',
    flexDirection: 'row',
    background: 'linear-gradient(#fff,#fff) padding-box, linear-gradient(to right, #88B5E1, #9188AB) border-box',
    borderImageSlice: 1,
    boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.2)',
    '&:hover': {
      background: 'linear-gradient(#fff,#fff) padding-box, linear-gradient(to right, #5d7a96, #585269) border-box',
    },
    flexWrap: 'wrap',
    justifyContent: 'space-between'
  },
  userImg: {
    maxWidth: "15em",
    height: '100%',
    width: '100%',
    minWidth: '10em',
    textAlign: 'center',
    margin: '2em 2em',
    flex: '0 1 10em'
  },
  detailBox: {
    display: 'flex',
    order: 2,
    minWidth: '5rem',
    maxWidth: '40rem',
    flex:' 1 1 5rem',
    flexDirection: 'column',
    fontStyle: "italic",
    fontWeight: "normal",
    fontSize: "1.2em",
    justifyContent: 'space-between',
    margin: '2em 8em 2em 2em',
    "& h2" : {
      flex: '1 1 5em'
    }
  },
  utilityRow : {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    minWidth: '5rem',
    maxWidth: '40rem',
    flex: '1 1 5rem',
  },
  detailGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: "0em 7em 0em 0em",
    flex: '0 1 auto',
    "& p" : {
      color: "#707070",
      margin: "0em 0.7em",
      display: "block",
      flex: "1 1 auto"
    },
  },
  commentIcon: {
    width: "2em",
    height: "2em",
    textAlign: "center",
    transform: 'scale(-1,1)',
    flex: "1 0 auto"
  },
  clockIcon: {
    width: "2em",
    height: "2em",
    textAlign: "center",
    flex: "1 0 auto"
  },
  button: {
    backgroundColor:"transparent",
    display:"inline-block",
    color:"#000000",
    fontWeight:"bold",
    textDecoration:"none",
    "&:hover": {
      backgroundColor: "#d5d5d5"
    },
    fontSize: '1rem',
    flex: "1 1 auto"
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
    },
    '&:hover' : {
      backgroundColor: '#ddd'
    }
  },
  likeSection : {
    display: 'flex',
    order: 3,
    flex: '2 1 5em',
    flexDirection: 'row',
    fontWeight: "normal",
    fontSize: "1.2em",
    justifyContent: 'space-evenly',
    margin: '2em 2em',
    alignItems: 'center',
    minWidth: '5em',
    maxWidth: '10em'
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
  },
  likeIcon : {
    transform: 'scale(1.5)'
  }
}));

export default function PostPreview(props) {
  const classes = useStyles();
  const postData = props.postData;
  const userImg = examplePicture;
  const user = useContext(UserContext);
  const [numberStyle, setNumStyle] = useState({
    color: (postData.liked ? '#40a9ff' : '#707070'),
    fontSize: '1.5em'
  });
  const [liked, setLike] = useState(postData.liked);
  const [edit, setEdit] = useState(false);
  const handleLikeButton = () => {
    let batch = db.batch();
    let postsDocRef =  db.collection('posts').doc(postData.pid);
    let userDocRef = db.collection('users').doc(user.uid).collection('likedPosts').doc(postData.pid);
    let userPostRef = db.collection('users').doc(postData.uid);
    if (!liked) {
      setNumStyle({...numberStyle, color: '#40a9ff'});
      postData.likes = postData.likes + 1;
      batch.update(postsDocRef, {likes: FieldValue.increment(1)});
      batch.update(userPostRef, {likes: FieldValue.increment(1)});
      batch.set(userDocRef, {uid: postData.uid});
      batch.commit().then(() => {
        console.log("batch commited");
      });
    } else {
      setNumStyle({...numberStyle, color: '#707070'});
      postData.likes = postData.likes - 1;
      batch.update(postsDocRef, {likes: FieldValue.increment(-1)});
      batch.update(userPostRef, {likes: FieldValue.increment(-1)});
      batch.delete(userDocRef);
      batch.commit().then(() => {
        console.log("batch commited");
      });
    }
    setLike(!liked);
  }
  const handleClick = (e) => {
    for (let i = 0; i < PostPreviewIgnoreNames.length; i++) {
      if(e.target.name === PostPreviewIgnoreNames[i]) {
        e.preventDefault();
        e.stopPropagation();
        break;
      }
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
  const handleEdit = (event) => {
    setEdit(!edit);
  }
  const handleSubmitEdit = (description) => {
    db.collection('posts').doc(postData.pid).update({
      body: description
    })
    .then(function() {
        console.log("Document successfully updated!");
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
    db.collection('users').doc(user.uid).collection('posts').doc(postData.pid).update({
      body: description
    })
    .then(function() {
        console.log("Document successfully updated!");
        window.location.reload(false);
    })
    .catch(function(error) {
        // The document probably doesn't exist.
        console.error("Error updating document: ", error);
    });
    setEdit(!edit);
  }
  useEffect(() => {
  }, []);
  return (
    <div className={props.className}>
      <Link to={"/posts/" + postData.pid} className={classes.cardArea} onClick={handleClick} name="cardLinkArea">
        <img src={userImg} className={classes.userImg}/>
        <div className={classes.detailBox}>
          <h2 id="post-preview-header">
            {postData.preview}
          </h2>
          <div className={classes.utilityRow}>
            <div className={classes.detailGroup}>
              <ClockIcon className={classes.clockIcon}/>
              <p>{getDate(postData.timestamp)}</p>
            </div>
            <div className={classes.detailGroup}> 
              <CommentBoxIcon className={classes.commentIcon}/>
              <p>{postData.commentCount ? postData.commentCount : 0} Comments</p>
            </div>
            { postData.uid === props.currentUserUid ?
              <div className={classes.detailGroup}> 
                <PostDropdown handleDelete={handleDelete} pid={postData.pid} className={classes.button} handleEdit={handleEdit}/>
              </div> : <div></div>
            }
          </div>
          {edit ? <EditPost description={postData.body} handleSubmitEdit={handleSubmitEdit} handleEdit={handleEdit} pid={postData.pid}/> : <div></div>}
        </div>
        <div className={classes.likeSection}>
          <img src={DividerLine} className={classes.dividerLine}/>
          <div className={classes.likeBox}>
            <button className={classes.likeButton} name="likeButton" onClick={handleLikeButton}>
              <LikeButton className={classes.likeIcon}/>
            </button>
            <p style={numberStyle}>{postData.likes}</p>
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