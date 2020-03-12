import React, {useEffect, useState} from 'react';
import firebase from 'firebase'
import UserPicture from './components/UserPicture';
import examplePicture from './assets/userImg.PNG';
import {Grid, Container, Box, Button, ListItem, ListItemText} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import DetailedPost from './components/DetailedPost';
import Comment from './components/Comment';
import CreateReply from'./components/CreateReply';
import { useCollection } from 'react-firebase-hooks/firestore';

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
  const db = firebase.firestore();
  const [mainReply, setMainReply] = useState(false);
  const handleMainReply = () => {
    setMainReply(!mainReply);
  }
  const commentsDB = db.collection("posts").doc("testpid").collection("comments").orderBy("timestamp", "desc")
  //TO-DO: FIX BUG WHERE EMPTY COMMENT IS SHOWN BY APPENDAGING FIRST ELEMENT
  // LOOK UP HOW TO USE EVENT LISTENERS FIRESTORE (PROBABLY WILL FIX ISSUE)
  // OR HOTFIX AND REUPDATE DB INSTANCE???
  useEffect(() => {
    commentsDB.onSnapshot((querySnapshot) => {
      let newArr = [];
      console.log(mainReply)
      console.log("listener has been updated?")
      console.log(querySnapshot);
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
      console.log(newArr);
      setComments(newArr);
    })
  }, []);
  return (
    <Container maxWidth="sm">
      <Grid container>
        <Grid item xs={8}>
          <Box>
            <DetailedPost setParent={handleMainReply}/>
          </Box>
          <Box>
            {mainReply ? <CreateReply firstName="test" lastName="again" pid="testpid" setParent={handleMainReply} timesp={firebase.firestore}/> : <div></div>}
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