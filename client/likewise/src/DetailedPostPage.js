import React, {useEffect, useState} from 'react';
import firebase from 'firebase'
import {Grid, Container, Box, ListItem, ListItemText} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import DetailedPost from './components/DetailedPost';
import Comment from './components/Comment';
import CreateReply from'./components/CreateReply';
import {useParams} from 'react-router-dom';

const useStyles = makeStyles(theme => ({
  root : {

  },
  summary: {
    fontWeight: "bold",
    fontSize: "1rem", 
    color: "#9188AB"
  },
  postOutline: {
    border: "1px solid #9188AB",

  },
  post: {
    display: "flex",
  }
}));

export default function DetailedPostPage(props) {
  const [comments, setComments] = useState([{}]);
  const [postData, setPostData] = useState({
    body: "",
    preview: "",
    uid: "",
    timestamp: "",
    likes: 0,
    firstName: "",
    lastName: ""
  });
  const [loading, setLoad] = useState(true);
  const db = firebase.firestore();
  const [mainReply, setMainReply] = useState(false);
  let { pid } = useParams();
  const handleMainReply = () => {
    setMainReply(!mainReply);
  }
  const commentsDB = db.collection("posts").doc(pid).collection("comments").orderBy("timestamp", "desc")
  //TO-DO: FIX BUG WHERE EMPTY COMMENT IS SHOWN BY APPENDAGING FIRST ELEMENT
  // LOOK UP HOW TO USE EVENT LISTENERS FIRESTORE (PROBABLY WILL FIX ISSUE)
  // OR HOTFIX AND REUPDATE DB INSTANCE???
  useEffect(() => {
    db.collection("posts").doc(pid).get().then((doc) => {
      let data = doc.data();
      let obj = {};
      for (const key in data) {
        obj = {
          ...obj,
          [key]: data[key]
        }
      }
      db.collection("users").doc(data.uid).get().then((doc) => {
        if (doc.exists) {
          data = doc.data();
          for (const key in data) {
            
            obj = {
              ...obj,
              [key]: data[key]
            }
            console.log(obj)
          }
        }
      setPostData(obj);
      setLoad(false);
      }).catch((e) => {
        console.log(e);
      })
    }).catch((e) => {
      console.log(e);
    })
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
          uid: data["uid"]
        };
        //console.log(data["timestamp"].toDate());
        newArr.push(newComment);
    });
      setComments(newArr);
    })
  }, []);
  console.log(postData);
  return (
    <Container maxWidth="sm">
      <Grid container>
        <Grid item xs={8}>
          <Box>
            {!loading ? <DetailedPost setParent={handleMainReply} postData={postData}/> : <DetailedPost setParent={handleMainReply} test={true}/>}
            
          </Box>
          <Box>
            {mainReply ? <CreateReply firstName={props.firstName} lastName={props.lastName} pid={pid} setParent={handleMainReply} timesp={firebase.firestore}
            uid={props.user.uid} /> : <div></div>}
          </Box>
          <Box>
          <h1>Replies</h1>
            {comments.length > 0 ? comments.map((item) => {
							return (
								<Comment username={item.firstName + " " + item.lastName} body={item.body} timestamp={item.timestamp}/>
							);}) 
							: 
							<ListItem button>
								<ListItemText primary="loading" />
							</ListItem>
						}
          </Box>
        </Grid>
        <Grid item xs={4}>

        </Grid>
      </Grid>
    </Container>
  );
}