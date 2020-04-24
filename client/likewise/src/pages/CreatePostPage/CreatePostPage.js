import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import firebase from 'firebase';
import { MenuItem, Menu, Grid, Button } from '@material-ui/core';
import { Redirect } from 'react-router-dom';

import SearchBar, { TagInput } from "../../components/Searchbar/searchbar";
import TagsInput from "../../components/TagsInput/TagsInput";

const useStyles = makeStyles(theme => ({
  root: {
    display: "flex",
    textAlign: "center",
    margin: "2rem",
    flex: "1 0 auto",
    border: "1px solid #9188AB",
    padding: "4rem",
    justifyContent: "center"
  },
  field: {
    display: "flex",
    padding: "1.2rem 0rem",
    flex: "1 0 auto",
    resize: "none",
  },
  fieldInput: {
    display: "flex",
    padding: "1.2rem 0rem",
    flex: "1 0 auto",
    resize: "none",
    border: "1px solid #9188AB",
  },
  form: {
    alignItems: "center",
    flexDirection: "column",
    display: "flex"
  },
  inputBlock: {
    float: "left",
    justifyContent: "flex-start",
    justifyItems: "start",
    textAlign: "left"
  },
  menu: {
    float: "left",
    justifyContent: "flex-start",
    justifyItems: "start",
    textAlign: "left",
    display: "flex"
  },
  title: {
    margin: "0rem 1rem",
  },
  button: {
    margin: "10px"
  }
}))

export default function CreatePostPage(props) {

  const db = firebase.firestore();
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [postData, setPost] = useState({
    summary: "",
    description: ""
  });
  const[tags, setTags] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const selectedTags = theseTags => {
    console.log(theseTags);
    setTags({
      ...tags,
      theseTags
    })
    console.log(tags);
  };

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };
  const handleSubmit = event => {
    db.collection('posts').add({
      body: postData.description,
      preview: postData.summary,
      uid: props.user.uid,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      likes: 0,
      tags: tags
    }).then(() => {
      setRedirect(true);
    })
  };
  const handleCancel = event => {
    setRedirect(true);
  };
  const handleChange = (event) => {
    const value = event.target.value;
    setPost({
      ...postData,
      [event.target.name]: value
    });
    console.log(postData);
    // console.log("postdata is being modified");
  }
  const handleClose = () => {
    setAnchorEl(null);
  };
  if (redirect) {
    return (
      <Redirect to="/posts" />
    )
  } else {
    return (
      <div>
        <SearchBar />
        <Grid container style={{ flexDirection: "column" }}>
          <Grid item xs={12} class={classes.title}>
            <h1 id="createPostTitle">Create Post</h1>
          </Grid>
          <Grid item xs={12} class={classes.root}>
            <form class={classes.form}>
              <div class={classes.inputBlock}>
                <label for="summary" class={classes.field}>Summary of Post</label>
                <textarea id="createSummary" name="summary" value={postData.summary}
                  class={classes.fieldInput} onChange={handleChange}></textarea>
              </div>
              <div class={classes.inputBlock}>
                <label for="description" class={classes.field}>Description</label>
                <textarea id="createDescription" name="description" value={postData.description}
                  class={classes.fieldInput} onChange={handleChange}></textarea>
              </div>
              <div class={classes.inputBlock}>
                <label for="tags" class={classes.field}>Tags</label>
                <TagsInput id="createTags" selectedTags={selectedTags} />
              </div>
            </form>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={7}>
          </Grid>
          <Grid item xs={1} spacing={0} class={classes.button}>
            <Button name="cancel" onClick={handleCancel} variant="contained">Cancel</Button>
          </Grid>
          <Grid item xs={1} spacing={0} class={classes.button}>
            <Button name="submit" onClick={handleSubmit} variant="contained">Submit</Button>
          </Grid>
          <Grid item xs={3} spacing={0}>

          </Grid>
        </Grid>
      </div>
    );
  }
}


// <div class={classes.menu}/>
// <label for="postType" class={classes.field} style={{padding:0}}>
//     Type of post
// </label>
// <Button name="postType" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
// Open Menu
// </Button>
// <Menu
//   id="simple-menu"
//   anchorEl={anchorEl}
//   keepMounted
//   open={Boolean(anchorEl)}
//   onClose={handleClose}
// >
//   <MenuItem onClick={handleClose}>Profile</MenuItem>
//   <MenuItem onClick={handleClose}>My account</MenuItem>
//   <MenuItem onClick={handleClose}>Logout</MenuItem>
// </Menu>
// <div class={classes.inputBlock}/>