import React from 'react';
import {makeStyles, Container} from '@material-ui/core';

const useStyles = makeStyles(theme => ({
    purple: {
        flexGrow: 1,
        backgroundColor: "#8481E2",
        color: "#FFF",
        marginRight: "auto",
        marginLeft: "auto",
        padding: "20px 40px",
    },
    white: {
        flexGrow: 1,
        backgroundColor: "#F6F6F2",
        color: "#000000",
        padding: "20px 40px",
    }
  }));

export default function Significance(props) {
    const classes = useStyles();
    return (
        <div>
            <div className={classes.purple}>
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
            <div className={classes.white}>
                <h2>
                    How does Likewise work?
                </h2>
                <div style={{
                        padding: "35px"}}>
                    <Container style={{background: "#FFFFFF",
                        border: "1px solid #000000",
                        boxSizing: "border-box",
                        borderRadius: "4px",
                        width: "85vw",
                        height: "60vh"}}>
                    </Container>
                </div>
            </div>
        </div>
    );
}