import React, {useEffect, useState} from 'react';
import firebase from 'firebase'
import {Grid, Container, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import DetailedPost from './components/DetailedPost';
import CommentSection from './components/CommentSection';
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
          }
        }
      setPostData(obj);
      setLoad(false);
      }).catch((e) => {
      })
    }).catch((e) => {
    })
    
  }, []);
  return (
    <Container maxWidth="sm">
      <Grid container>
        <Grid item xs={8}>
          <Box>
            {!loading ? <DetailedPost setParent={handleMainReply} postData={postData}/> : <DetailedPost setParent={handleMainReply} test={true}/>}
          </Box>
          <Box>
            {mainReply ? <CreateReply firstName={props.firstName} lastName={props.lastName} 
            parentId={pid} setParent={handleMainReply} timesp={firebase.firestore} postReply={true}
            uid={props.user.uid} /> : <div></div>}
          </Box>
          <CommentSection pid={pid} timesp={firebase.firestore} uid={props.user.uid}/>
        </Grid>
        <Grid item xs={4}>

        </Grid>
      </Grid>
    </Container>
  );
}