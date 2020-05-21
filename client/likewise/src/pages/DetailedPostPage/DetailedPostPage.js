import React, {useEffect, useState, useContext} from 'react';
import {Grid, Container, Box} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import DetailedPost from '../../components/DetailedPost';
import CommentSection from '../../components/CommentSection';
import CreateReply from'../../components/CreateReply';
import {useParams} from 'react-router-dom';
import {UserContext} from '../../providers/firebaseUser'; 
import SearchBar, { BackBar } from "../../components/Searchbar/searchbar";
import {firestore as db} from '../../utils/firebase';
import Leaderboard from '../../components/Leaderboard/Leaderboard';
import Report from '../../components/Report';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: "1.2rem"
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
  const classes = useStyles();
  const [postData, setPostData] = useState({
    body: "",
    preview: "",
    uid: "",
    timestamp: "",
    likes: 0,
    firstName: "",
    lastName: "",
    commentCount: 0
  });
  const [loading, setLoad] = useState(true);
  const user = useContext(UserContext);
  const [mainReply, setMainReply] = useState(false);
  const [report, setReport] = useState(false);
  let { pid } = useParams();
  const handleMainReply = () => {
    setMainReply(!mainReply);
  }
  const reportHandler = () => {
    setReport(!report);
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
      setPostData(obj);
      setLoad(false);
    }).catch((e) => {
    })
    
  }, []);

  const displaySearchResults = () => {
    const query = window.searchComponent.returnState();
  }
  return (
    <div>
      <BackBar/>
      <Grid container className={classes.root}>
        <Grid item xs={12} s={8} md={8} id='comment-post-section'>
          <h1>Reflection (or Question)</h1>
          {!loading ? <DetailedPost setParent={handleMainReply} postData={postData} reportHandler={reportHandler}/> 
          : <div></div>}
          {mainReply ? <CreateReply firstName={user.firstName} lastName={user.lastName} 
          parentId={pid} setParent={handleMainReply} postId={pid} commentCount={postData.commentCount}
          uid={user.uid} /> : <div></div>}
          {report ? <Report setParent={reportHandler} pid={pid} uid={user.uid} type="post"/> : <div></div>}
          <h1>Replies</h1>
          <CommentSection pid={pid} uid={user.uid} commentCount={postData.commentCount}/>
        </Grid>
        <Grid item xs = {0} s={4} md={4} style={{display:"flex", justifyItems: "center"}}>
          <Leaderboard/>
        </Grid>
      </Grid>
    </div>
    
  );
}