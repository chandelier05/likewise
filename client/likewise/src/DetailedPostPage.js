import React, {useEffect, useState} from 'react';
import firebase from 'firebase'
import UserPicture from './components/UserPicture';
import examplePicture from './assets/userImg.PNG';
import {Grid, Container, Box, Button, ListItem, ListItemText} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import DetailedPost from './components/DetailedPost';
import Comment from './components/Comment';
import CreateReply from'./components/CreateReply';

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
  useEffect(() => {
    let newArr = [];
    db.collection("posts").doc("testpid").collection("comments").orderBy("timestamp", "desc")
    .get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        var data = doc.data();
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
    }).catch(function(error) {
      console.log("Error getting document:", error);
    })     
  }, []);
  console.log(comments);
  return (
    <Container maxWidth="sm">
      <Grid container>
        <Grid item xs={8}>
          <Box>
            <DetailedPost/>
          </Box>
          <Box>
            <CreateReply/>
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