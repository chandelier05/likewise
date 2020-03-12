import React from 'react';
import firebase from 'firebase';
import {Grid, Container, Box, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  fieldInput: {
    display: "flex",
    padding: "1.2rem 0rem",
    flex: "1 0 auto",
    resize:"none",
    border: "1px solid #88B5E1",
  },
}));

export default function CreateReply(props) {
  const classes = useStyles();

  return (
    <Grid container>
      <Grid item xs={12}>
        <label for="commentBox">Create reply</label>
      </Grid>
      <Grid item xs={12}>
        <textarea name="commentBox" class={classes.fieldInput}></textarea>
      </Grid>
      <Grid item xs={12}>
        <Button variant="outlined" style={{border: "solid 1px #9188AB", margin: "0rem 1rem"}}>Cancel</Button>
        <Button variant="contained" style={{backgroundColor: "#9188AB", margin: "0rem 1rem"}}>Post</Button>      
      </Grid>
    </Grid>
  )
}