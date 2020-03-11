import React, { useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import firebase from 'firebase';
import { Typography, MenuItem, Menu, Grid, Button, Container } from '@material-ui/core';

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
    resize:"none",
  },
  fieldInput: {
    display: "flex",
    padding: "1.2rem 0rem",
    flex: "1 0 auto",
    resize:"none",
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
  }
}))

export default function CreatePostPage(props) {
    const db = firebase.firestore();
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = event => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  return (
    <div>
      <Grid container style={{flexDirection: "column"}}>
        <Grid item xs={12} class={classes.title}>        
          <h1 id="createPostTitle">Create Post</h1>
        </Grid>
        <Grid item xs={12} class={classes.root}>
          <form class={classes.form}>
            <div class={classes.menu}/>
              <label for="postType" class={classes.field} style={{padding:0}}>
                  Type of post
              </label>
              <Button name="postType" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
              Open Menu
              </Button>
              <Menu
                id="simple-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
                <MenuItem onClick={handleClose}>Logout</MenuItem>
              </Menu>
            <div class={classes.inputBlock}/>
            <div class={classes.inputBlock}>
              <label for="summary" class={classes.field}>Summary of Post</label>
              <textarea id="createSummary" name="summary" class={classes.fieldInput}></textarea>
            </div>
            <div class={classes.inputBlock}>
              <label for="description" class={classes.field}>Description</label>
              <textarea id="createDescription" name="descsription" class={classes.fieldInput}></textarea>
            </div>
            <div class={classes.inputBlock}>
              <label for="tags" class={classes.field}>Tags</label>
              <input type="text" id="createTags" name="tags" class={classes.fieldInput}/>
            </div>
          </form>
        </Grid>
      </Grid>
    </div>
  )
}