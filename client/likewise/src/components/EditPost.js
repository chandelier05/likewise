import React, {useState, useEffect} from 'react';
import {Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
const useStyles = makeStyles(theme => ({
  root: {
    textAlign: "center",
    border: "1px solid #9188AB",
    margin: "2rem",
    display: "block",
    overflow: "hidden",
    fontSize: "1.4rem"
  },
  buttons: {
    margin: "1rem 0rem 0rem 2rem",
    borderRadius: "5px",
    borderStyle: "none",
    fontSize: "1.4rem",
    padding: "0.15rem 0.5rem"
  },
  fieldInput: {
    resize: "none",
    width: "100%",
    height: "12.5rem",
    borderRadius: "5px",
    border: "1px solid #9188AB",
    background: "#F5F5F5"
  }
}));

export default function EditPost(props) {
  const classes = useStyles();
  const [description, setDescription] = useState("");
  useEffect(() => {
    //console.log(props.description);
    setDescription(props.description);
    console.log(props.pid);
  }, []);
  const handleChange = (event) => {
    setDescription(event.target.value);
    // console.log(postData);
    // console.log("postdata is being modified");
  }
  return (
    <div className={classes.root} name="editPostBox">
      <textarea value={description} onChange={handleChange} className={classes.fieldInput} name="editPostTextarea">

      </textarea>
      <div class={classes.rowButton} name="editPostBox">
        <div class={classes.buttons} style={{width: "10rem" }} name="editPostBox">

        </div>
        <Button variant="outlined" style={{border: "solid 1px #9188AB", backgroundColor:"#FFFFFF"}} 
        onClick={() => (props.handleEdit())} className={classes.buttons} name='cancelEditPost'>Cancel</Button>
        <Button variant="contained" style={{border: "solid 1px #9188AB", backgroundColor: "#9188AB", color:"#FFFFFF"}} 
        onClick={() => (props.handleSubmitEdit(description))} className={classes.buttons} name='submitEditPost'>Edit</Button>      
      </div>
    </div>
  )
}