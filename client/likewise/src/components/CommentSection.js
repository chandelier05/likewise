import React, {useEffect, useState} from 'react';
import firebase from 'firebase';
import {Grid, Box, ListItem, ListItemText} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import CreateReply from'./CreateReply';
import Comment from './Comment';

export default function CommentSection(props) {
  const [comments, setComments] = useState([]);
  const [loading, setLoad] = useState(true);
  const db = firebase.firestore();
  const commentsDB = db.collection("posts").doc(props.pid).collection("comments").orderBy("timestamp", "desc");
  useEffect(() => {
    try {
      commentsDB.onSnapshot((querySnapshot) => {
        let newArr = [];
        querySnapshot.forEach((doc) => {
          // prevent listener from updating comments if new doc created has not been fully written to server
          if (doc.metadata.hasPendingWrites) {
            return;
          }
          var data = doc.data();
          
          // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
          // console.log(source, " data: ", doc.data());
          var newComment = {
            body: data["body"],
            firstName: data["firstName"],
            lastName: data["lastName"],
            timestamp: data["timestamp"].toDate().toString(),
            uid: data["uid"],
            cid: doc.id,
            replies : []
          };
          //console.log(data["timestamp"].toDate());
          newArr.push(newComment);
        });
          newArr = getReplies(db, newArr);
          setComments(newArr);    
      })
    } catch (error) {

    } finally {
      setLoad(false);
    }
  }, []);
  // useEffect(() => {
  //   let newArr = getReplies(db, comments, setLoad);
  //   setReplies(newArr);
  // }, [loading]);
  return (
    <Box>
      <h1>Replies</h1>
      {!loading && comments.length > 0 ? comments.map((item) => {
          return (
            <div>
              <Comment lastName={item.firstName} firstName={item.lastName} 
              body={item.body} timestamp={item.timestamp} parentId={props.pid} uid={props.uid} timesp={props.timesp}/>
              <div>
                {!loading && !Array.isArray(item.replies) && !item.replies.length ? item.replies.map((subItem) => {
                    return (
                      <Comment lastName={item.firstName} firstName={item.lastName}
                      body={subItem.body} timestamp={subItem.timestamp} parentId={item.cid} uid={props.uid} timesp={props.timesp}/>
                    )
                  }) : <div></div>
                }
              </div>            
            </div>
          );
        }) : 
        <ListItem button>
          <ListItemText primary="loading" />
        </ListItem>
      }
    </Box>
  )
}

function getReplies(db, comments) {
  let newArr = [];
  for (let i = 0; i < comments.length; i++) {
    let commentItem = comments[i];
    let list = [];
    db.collection("comments")
      .doc(commentItem.cid).collection("replies").get()
      .then((querySnapshot) => {
        console.log("querysnapshot: ");
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
          list.push(doc.data());
          console.log(doc.data());
        })
      }).catch((e) => {
        console.log(e);
    });
    commentItem.replies = list;
    newArr.push(commentItem);
  }
  return newArr;
}