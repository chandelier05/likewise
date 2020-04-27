import React, { useState, useEffect } from 'react';
import UserPicture from '../../assets/userImg.PNG';
import {Grid, Container} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import firebase from 'firebase';
import SearchBar, { TagInput } from "../../components/Searchbar/searchbar";
import PostPreview from '../../components/PostPreview';

const useStyles = makeStyles(theme => ({

}))

export default function AccountPage(props) {
  const [posts, setPost] = useState([]);
  const [load, setLoad] = useState(true);
  const db = firebase.firestore();
  useEffect(() => {
    db.collection('users').doc(props.user.uid).collection('posts').get().orderBy("timestamp", "desc").then((querySnapshot) => {
      let tempList = [];
      querySnapshot.forEach((doc) => {
        if (doc.metadata.hasPendingWrites) {
          return;
        }
        let postObj = {
          preview: doc.data()["preview"],
          body: doc.data()["body"],
          uid: doc.data()["uid"],
          likes: doc.data()["likes"],
          timestamp: doc.data()["timestamp"].toDate().toString(),
          pid: doc.id,
          commentCount: doc.data()["commentCount"]
        };
        tempList.push(postObj);
      });
      setLoad(false);
      setPost(tempList);
    }).catch((e) => {
      console.log("Error getting documents: ", e);
    });
  }, []);
  console.log(props.user.uid);
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={8}>
          <h1>Posts: </h1>
          {!load ? 
            posts.map((item) => {
              return (<PostPreview postData={item}/>)
            }) : <div></div>
          }
        </Grid>
        <Grid item xs={4}>
          <div>

          </div>
        </Grid>
      </Grid>
    </Container>
  );
}