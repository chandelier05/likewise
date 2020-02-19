import React from 'react';
import {makeStyles} from '@material-ui/core';
import './style.css';

const useStyles = makeStyles(theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: "#8481E2",
        color: "#FFF",
        marginRight: "auto",
        marginLeft: "auto",
        width: "100%",
    },
  }));

export default function Significance(props) {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <h2>
                Have you ever felt (changing text: lost, sad, happy, etc)?
            </h2>
            <h3 style={{fontStyle: "italic"}}>
                Many of us have too.
            </h3>
            <p>
            Likewise was created to be a safe space for students at UW to share the hardships 
            they face along with the happy experiences that they have. We want you to be able to 
            connect with others like you so that our UW community can help you overcome any difficulties 
            you may be facing together. By making posts and responding with your advice,
            opinions and experiences, we can also help those who are too afraid to speak up and share.
            </p>
        </div>
    );
}