import React, { useEffect, useState} from 'react';
import firebase from 'firebase';
import {Grid, Container, Box, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    border: "1px solid #9188AB",
    margin: "2rem"
  },
  fieldInput: {
    resize: "none",
    width: "100%",
    height: "12.5rem",
    borderRadius: "5px",
    border: "1px solid #9188AB",
    background: "#F5F5F5"
  },
  row: {
    display: "flex",
    justifyContent: "end",
    alignItems: "flex-end",
    textAlign: "right",
    margin: "2rem 2rem 0.5rem"

  },
  buttons: {
    margin: "1rem 0rem 0rem 2rem",
    width: "50px",
    borderRadius: "5px",
    borderStyle: "none",
    fontSize: "0.7rem",
    padding: "0.15rem 0.5rem"
  },
  labelRow: {
    textAlign: "center",
    padding: "0.5rem",
  },
  rowButton: {
    display: "flex",
    justifyContent: "end",
    alignItems: "flex-start",
    textAlign: "right",
    margin: "0rem 2rem 2rem"
  }
}));

export default function CreateReply(props) {
  const db = firebase.firestore();
  const classes = useStyles();
  const [comment, setComment] = useState("");
  const handleSubmit = (event) => {
    db.collection('posts').doc(props.pid).collection("comments").add({
      body: comment,
      uid: "TEMPORARY PLACEHOLDER",
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
      firstName: props.firstName,
      lastName: props.lastName
    }).then(() => {
      props.setParent();
    })
  };
  const handleCancel = event => {

  };
  const handleChange = (event) => {
    setComment(event.target.value);
    // console.log(postData);
    // console.log("postdata is being modified");
  }
  useEffect(() => {

  }, []);

  return (
    <div class={classes.root}>
      <div class={classes.labelRow} id="labelRow">
        <label for="replyBox" class={classes.label}>Create reply</label>
      </div>
      <div class={classes.row}>
        <textarea id="replyBox" name="replyBox" class={classes.fieldInput} value={comment} onChange={handleChange}></textarea>
      </div>
      <div class={classes.rowButton} >
        <div class={classes.buttons} style={{width: "20rem" }}>

        </div>
        <Button variant="outlined" style={{border: "solid 1px #9188AB", backgroundColor:"#FFFFFF"}} 
        onClick={handleCancel} class={classes.buttons}>Cancel</Button>
        <Button variant="contained" style={{border: "solid 1px #9188AB", backgroundColor: "#9188AB", color:"#FFFFFF"}} 
        onClick={handleSubmit} class={classes.buttons}>Post</Button>      
      </div>
    </div>
  )
}
