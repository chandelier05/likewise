import React, {useState, useEffect} from 'react';
import Comment from './Comment';
import {makeStyles} from '@material-ui/core/styles';
import { firestore as db } from '../utils/firebase';

const useStyles = makeStyles(theme => ({
  commentReply: {
    marginLeft: "7rem",
  }
}));

// IMPLEMENT VISUAL FUNCTIONALITY OF COMMENT THREADING PAST 2 LEVELS
export default function MainComment(props) {
  const [replies, setReplies] = useState([]);
  const [loading, setLoad] = useState(false);
  const [madeComment, setMadeComment] = useState(false);
  const classes = useStyles();
  const rerenderPage = () => {
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
          uid: data["uid"],
          parentId: data['parentId'],
          deleted: data["deleted"]
        };
        tempReplies.push(comment);
      });
      console.log(tempReplies);
      setReplies(tempReplies);
      setLoad(false);
    });
  }, [madeComment]);
 // console.log(props.firstName + " " + props.body)
  return (
    <div>
      <Comment firstName={props.firstName} lastName={props.lastName} 
      body={props.body} timestamp={props.timestamp} parentId={props.parentId} 
      setParent={rerenderPage} postId={props.postId} commentUid={props.commentUid}
      commentCount={props.commentCount} posterId={props.posterId} cid={props.parentId} deleted={props.deleted}/>
      <div>
        {!loading && replies.length ?
          replies.map((subItem) => {
            return (
              <div className={classes.commentReply}>
                <Comment firstName={subItem.firstName} lastName={subItem.lastName}
                body={subItem.body} timestamp={subItem.timestamp} parentId={subItem.parentId} cid={subItem.cid}
                postReply={false} setParent={rerenderPage} commentUid={subItem.uid}
                postId={props.postId} commentCount={props.commentCount} commentReply={true} deleted={subItem.deleted}/>
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