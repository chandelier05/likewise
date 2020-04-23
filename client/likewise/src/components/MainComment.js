import React, {useState, useEffect} from 'react';
import Comment from './Comment';
import {makeStyles} from '@material-ui/core/styles';
import firebase from 'firebase';

const useStyles = makeStyles(theme => ({
  commentReply: {
    marginLeft: "7rem",
  }
}));

export default function MainComment(props) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoad] = useState(false);
  const [madeComment, setMadeComment] = useState(false);
  const classes = useStyles();
  const db = firebase.firestore();
  const rerenderPage = () => {
    console.log("rerenderPage has been called")
    setMadeComment(!madeComment);
  }
  useEffect(() => {
    setLoad(true);
    const repliesDB = db.collection("comments").where("parentId", "==", props.parentId).orderBy("timestamp", "desc");
    repliesDB.onSnapshot((querySnapshot) => {
      let tempReplies = [];
      querySnapshot.forEach((doc) => {
        // console.log("inserting data into repliesArr")
        // console.log(doc);
        // console.log(doc.data())
        if (doc.metadata.hasPendingWrites) {
          return;
        }
        //console.log(doc.data())
        var data = doc.data();
        var comment = {
          cid: doc.id,
          timestamp: data["timestamp"].toDate().toString(),
          body: data["body"],
          firstName: data["firstName"],
          lastName: data["lastName"],
          uid: data["uid"]
        };
        tempReplies.push(comment);
      });
      setReplies(tempReplies);
      setLoad(false);
    });
  }, [madeComment]);
  return (
    <div>
      <Comment lastName={props.firstName} firstName={props.lastName} 
      body={props.body} timestamp={props.timestamp} parentId={props.parentId} 
      setParent={rerenderPage} posterId={props.posterId} timesp={props.timesp} postId={props.postId}
      commentCount={props.commentCount} uid={props.uid}/>
      <div>
        {!loading && replies.length ?
          replies.map((subItem) => {
            return (
              <div className={classes.commentReply}>
                <Comment lastName={subItem.firstName} firstName={subItem.lastName}
                body={subItem.body} timestamp={subItem.timestamp} parentId={subItem.parentId} 
                uid={props.uid} posterId={subItem.uid} timesp={props.timesp} postReply={false} setParent={rerenderPage}
                postId={props.postId} commentCount={props.commentCount}/>
              </div>
            );
          })
        :
          <div></div>
        }
      </div>            
    </div>
  )
}