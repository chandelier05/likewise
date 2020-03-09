import React, { useState, useEffect } from 'react';
import PostPreview from './components/PostPreview';
import circle from './assets/Feature1.png';
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
    var docRef = db.collection("posts").doc("testpid");
    
    docRef.get().then(function(doc) {
      if (doc.exists) {
        setPosts(
          [
            {
              preview: doc.data()["preview"],
              body: doc.data()["body"],
              uid: doc.data()["uid"]
            }
          ]
        );
        console.log("Document data:", doc.data()["body"]);
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }, []);
  return (
  <Grid container className={classes.root}>
    <Grid item xs={12}>
      <PostPreview preview="Lorem ipsum dolor sit amet, nonumes 
      referrentur mel an, sed ea maiorum contentiones, alia stet quando ei vix. 
      Ut choro comprehensam vis, est id sale reprimique. Et sit ullum repudiandae. 
      Usu in idque possit euripidis. Id minim accusata qui, ei eam sumo reformidans. 
      Ipsum inermis sed id." userImg={circle}/>
    </Grid>
  </Grid>   
  )
}