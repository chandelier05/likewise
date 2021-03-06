import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import {firestore as db, getTimeStamp} from '../utils/firebase';

const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    border: "1px solid #9188AB",
    margin: "2rem",
    display: "block",
    overflow: "hidden"
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

export default function Report(props) {
  const classes = useStyles();
  const [summary, setSummary] = useState("");
  const handleCancel = () => {
    props.setParent();
  }
  const handleSubmit = () => {
    db.collection('reports').add({
      summary: summary,
      uid: props.uid,
      timestamp: getTimeStamp(),
      pid: props.pid,
      type: props.type
    })
    props.setParent();
  }
  const handleChange = (event) => {
    setSummary(event.target.value);
    // console.log(postData);
    // console.log("postdata is being modified");
  }
  return (
    <div class={classes.root}>
      <div class={classes.labelRow} id="labelRow">
        <label for="replyBox" class={classes.label}>Create Report</label>
      </div>
      <div class={classes.row}>
        <textarea id="replyBox" name="replyBox" class={classes.fieldInput} value={summary} onChange={handleChange}></textarea>
      </div>
      <div class={classes.rowButton} >
        <div class={classes.buttons} style={{width: "10rem" }}>

        </div>
        <Button variant="outlined" style={{border: "solid 1px #9188AB", backgroundColor:"#FFFFFF"}} 
        onClick={handleCancel} class={classes.buttons}>Cancel</Button>
        <Button variant="contained" style={{border: "solid 1px #9188AB", backgroundColor: "#9188AB", color:"#FFFFFF"}} 
        onClick={handleSubmit} class={classes.buttons}>Report</Button>      
      </div>
    </div>
  )
}