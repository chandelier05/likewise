import React, { useState, useEffect, useContext } from 'react';
import {firestore as db} from '../../utils/firebase';
import {Grid, Container} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import SearchBar, { TagInput } from "../../components/Searchbar/searchbar";
import PostPreview from '../../components/PostPreview';
import {UserContext} from '../../providers/firebaseUser';

const useStyles = makeStyles(theme => ({

}))

export default function AccountPage(props) {
  const [posts, setPost] = useState([]);
  const [load, setLoad] = useState(true);
  const user = useContext(UserContext);
  // TODO: Change so that instead of requerying firebase, we just remove the appropriate post.
  const setChildHandler = (pid) => {
    // let index = posts.findIndex(post => post.pid == pid);
    // let tempArr = [...posts];
    // console.log(tempArr === posts);
    // tempArr = tempArr.splice(index, 1);
    // console.log(tempArr);
    //console.log(pid);
    setPost(posts.filter((post) => {
      // console.log("filtering :" + post.pid);
      // console.log(post.pid == pid);
      return post.pid != pid;
    }));
  }
  // TODO: PENDINGWRITES ISSUE WITH EDIT POST
  useEffect(() => {
    db.collection('users').doc(user.uid).collection('posts').orderBy("timestamp", "desc").onSnapshot((querySnapshot) => {
      let tempList = [];
      querySnapshot.forEach((doc) => {
        if (doc.metadata.hasPendingWrites) {
          console.log('pendingwrites')
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
        console.log(doc.data()["body"])
        tempList.push(postObj);
        //console.log(postObj.pid == "H0zAR2oDmowBk2Al1zy1");
      });
      setLoad(false);
      setPost(tempList);
    })
    //console.log("useEffect called");
  }, []);
  console.log(posts);
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={12}>
          <h1 className='account-page-header'>Posts: </h1>
          {!load ? 
            posts.map((item) => {
              return (<PostPreview postData={item} setParent={setChildHandler} currentUserUid={user.uid} className='post-preview-resize'/>)
            }) : <div></div>
          }
        </Grid>
      </Grid>
    </Container>
  );
}