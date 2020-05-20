import React, {useEffect, useState, useRef} from 'react';
import {firestore as db} from '../utils/firebase';
import {Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import MainComment from './MainComment';
import Comment from './Comment';

//TODO change margin on replies to comments automatically depending on nested level

export default function CommentSection(props) {
  const _isMounted = useRef(true);
  const [comments, setComments] = useState([]);
  const [loading, setLoad] = useState(false);
  const [madeComment, setMadeComment] = useState(false);
  const commentsList = db.collection("comments").where("parentId", "==", props.pid).orderBy("timestamp", "desc");
  const rerenderPage = () => {
    console.log("rerenderPage has been called")
    setMadeComment(!madeComment);
  }
  useEffect(() => {
    try {
      setLoad(true);
      commentsList.onSnapshot((querySnapshot) => {
        let tempComments = [];
        querySnapshot.forEach((doc) => {
          // prevent listener from updating comments if new doc created has not been fully written to server
          if (doc.metadata.hasPendingWrites) {
            return;
          }
          var data = doc.data();
          var comment = {};
          if (data['deleted'] === 'TRUE') {
            comment = {
              cid: doc.id,
              timestamp: data["timestamp"].toDate().toString(),
              body: data["body"],
              firstName: data["firstName"],
              lastName: data["lastName"],
              uid: data["uid"],
              deleted: true
            };
          } else {
            comment = {
              cid: doc.id,
              timestamp: data["timestamp"].toDate().toString(),
              body: data["body"],
              firstName: data["firstName"],
              lastName: data["lastName"],
              uid: data["uid"],
              deleted: false
            };
          }
          tempComments.push(comment);
        });
        setComments(tempComments);
      });
    } catch (error) {
      
    } finally {
      setLoad(false);
      return () => { // ComponentWillUnmount in Class Component
        _isMounted.current = false;
      }
    }
  }, [madeComment]);
  //console.log(comments);
  return (
    <div className="comment-section-box">
      {!loading && comments.length > 0 ? comments.map((item) => {
          return (
            <MainComment firstName={item.firstName} lastName={item.lastName} 
            body={item.body} timestamp={item.timestamp} parentId={item.cid} 
            setParent={rerenderPage} postId={props.pid} commentUid={item.uid}
            commentCount={props.commentCount} posterId={item.uid} deleted={item.deleted}/>
          );
        }) : 
        <Comment body={"No comments... Be the first to reply!"} empty={true} commentUid={'placeholder'}/>
      }
    </div>
  )
}

// const getReplies = (comments, handleLoad) => {
//   let tempReplies = {};
//   try {
//     const db = firebase.firestore();
//     console.log("testing rerender")
//     let promiseArr = [];
//     for (let i = 0; i < comments.length; i++) {
//       tempReplies[comments[i].cid] = [];
//       promiseArr.push(db.collection("comments").where("parentId", "==", comments[i].cid).orderBy("timestamp", "desc").get());
//     }
//     Promise.all(promiseArr).then((queryArr) => {
//       for (let i = 0; i < queryArr.length; i++) {
//         queryArr[i].forEach((doc) => {
//           // console.log("inserting data into repliesArr")
//           // console.log(doc);
//           // console.log(doc.data())
//           if (doc.metadata.hasPendingWrites) {
//             return;
//           }
//           var data = doc.data();
//           var comment = {
//             cid: doc.id,
//             timestamp: data["timestamp"].toDate().toString(),
//             body: data["body"],
//             firstName: data["firstName"],
//             lastName: data["lastName"],
//             uid: data["uid"]
//           };
//           tempReplies[data["parentId"]].push(comment);
//         });
//       }
//     });
//   } catch (error) {

//   } finally {
//     handleLoad();
//   }
//   return tempReplies;
// }
// .get()
//       .then((querySnapshot) => {
//         querySnapshot.forEach((doc) => {
//           var data = doc.data();
//           if (doc.metadata.hasPendingWrites) {
//             return;
//           }
//           // var source = doc.metadata.hasPendingWrites ? "Local" : "Server";
//           // console.log(source, " data: ", doc.data());
//           var newComment = {
//             body: data["body"],
//             firstName: data["firstName"],
//             lastName: data["lastName"],
//             timestamp: data["timestamp"].toDate().toString(),
//             uid: data["uid"],
//             cid: doc.id
//           };
//           list.push(newComment);
//         })
//       }).catch((e) => {
//         console.log(e);
//     });
//     commentItem.replies = list;
//     newArr.push(commentItem);


// 