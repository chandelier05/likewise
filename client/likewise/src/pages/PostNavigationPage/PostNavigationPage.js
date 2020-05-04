import React, { useState, useEffect, useContext } from 'react';
import {firestore} from '../../utils/firebase';
import PostPreview from '../../components/PostPreview';
import UserPicture from '../../assets/userImg.PNG';
import Grid from '@material-ui/core/Grid';
import { makeStyles} from '@material-ui/core/styles';
import SearchBar from "../../components/Searchbar/searchbar";
import {UserContext} from '../../providers/firebaseUser';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: "1.2rem"
  },
  postSection: {
    "&:first-child" : {
      margin: "0rem 2rem 1rem 2rem"
    }
  },
  header : {
    margin: "0rem 1rem",
    fontSize: "3rem",
    background: "rgb(136,181,225)",
    background: "linear-gradient(90deg, rgba(136,181,225,1) 0%, rgba(145,136,171,1) 25%)",
    WebkitTextFillColor: "transparent",
    WebkitBackgroundClip: "text",
    fontFamily: "Roboto",
    fontStyle: "normal",
    fontWeight: "900"
  }
}))

export default function PostNavigationPage(props) {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [loading, setLoad] = useState(false);
  const user = useContext(UserContext);
  // Similar to componentDidMount and componentDidUpdate:
  // TODO: change functionality to look for most recent posts? and compile into list
  const setChildHandler = (pid) => {
    // let index = posts.findIndex(post => post.pid == pid);
    // let tempArr = [...posts];
    // console.log(tempArr === posts);
    // tempArr = tempArr.splice(index, 1);
    // console.log(tempArr);
    console.log(pid);
    setPosts(posts.filter((post) => {
      console.log("filtering :" + post.pid);
      console.log(post.pid == pid);
      return post.pid != pid;
    }));
  }
  useEffect(() => {
    setLoad(true);
    var docRef = firestore.collection("posts").orderBy("likes", "asc");
    
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
              pid: doc.id,
              commentCount: doc.data()["commentCount"]
            }
          newArr.push(postData);
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      });
      setPosts(newArr);
      setLoad(false);
    }).catch(function(error) {
      console.log("Error getting document:", error);
    });
  }, []);
  return (
  <Grid container className={classes.root}>
    <Grid item xs={12} id="postSectionPreview">
    <SearchBar/>
    <h1 className={classes.header}>Browse posts</h1>
      {!loading && posts.length > 0 ? 
          posts.map((item) => {
            return <PostPreview className="postPreview" 
              postData={item} userImg={UserPicture} 
              currentUserUid={user.uid} setParent={setChildHandler}/>
          })
        : 
          <h2>loading</h2>
      }
    </Grid>
  </Grid>   

  )
}