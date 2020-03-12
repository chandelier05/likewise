import React, { useState, useEffect } from 'react';
import PostPreview from './components/PostPreview';
import UserPicture from './assets/userImg.PNG';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import firebase from 'firebase';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: "1.2rem",
  }
}))

export default function PostNavigationPage(props) {
  const db = firebase.firestore();
  const classes = useStyles();
  const [posts, setPosts] = useState([])
  // Similar to componentDidMount and componentDidUpdate:
  // TODO: change functionality to look for most recent posts? and compile into list
  useEffect(() => {
    var docRef = db.collection("posts").orderBy("likes", "asc")
    
    docRef.get().then((QuerySnapshot) => {
      let newArr = [];
      QuerySnapshot.forEach((doc) => {
        if (doc.exists) {
          let postData = 
            {
              preview: doc.data()["preview"],
              body: doc.data()["body"],
              uid: doc.data()["uid"],
              likes: doc.data()["likes"],
              timestamp: doc.data()["timestamp"].toDate().toString(),
              pid: doc.id
            }
          newArr.push(postData);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
      setPosts(newArr);
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }, []);
  return (
  <Grid container className={classes.root}>
    <Grid item xs={12}>
      {posts.length > 0 ? 
          posts.map((item) => {
            return <PostPreview preview={item.preview} pid={item.pid} userImg={UserPicture}/>
          })
        : 
          <PostPreview preview="loading" userImg={UserPicture}/>
      }
    </Grid>
  </Grid>   
  )
}