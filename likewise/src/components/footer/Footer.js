import React from 'react';
import {makeStyles, Container, Button, Grid, Box} from '@material-ui/core';
import './style.css';
import circle from "../../assets/circle.PNG";

const useStyles = makeStyles(theme => ({
    root: {
        backgroundColor: "#F6F6F2",
        padding: "40px 40px",
    }
}));

export default function Footer(props) {
    const classes = useStyles();
    return (
        <Box class={classes.root}>
            <Grid container spacing={4}>
                <Grid item sm={2}>
                    <h2>
                        Likewise
                    </h2>
                </Grid>
                <Grid item sm={4}>
                    <h3>
                        Want to know more?
                    </h3>
                    <p>
                        This project is a part of the Capstone Project course at the University of Washington 
                        Information School, more information about it can be found at <span style={{fontWeight: "bold"}}>
                            https://ischool.uw.edu/capstone </span>
                    </p>
                    <p>
                        If you have any questions for us, please feel free to email us at <span style={{fontWeight: "bold"}}>
                            project.likewise@gmail.com </span>
                    </p>
                </Grid>
                <Grid container item sm={1} style={{padding:"0", width:"5px"}} id="line">
                    <hr width="0.5" size="300" style={{background: "black",
                    border: "none"}}></hr>
                </Grid>
                <Grid item sm={5}>
                    <h2 style={{paddingBottom: "20px"}}>
                        Our team members
                    </h2>
                    <Grid container spacing={6}>
                        <Grid item sm={3}>
                            <img src={circle}/>
                            <p>Brian Uyeda</p>
                        </Grid>
                        <Grid item sm={3}>
                        <img src={circle}/>
                            <p>Tiffany Lai</p>
                        </Grid>
                        <Grid item sm={3}>
                        <img src={circle}/>
                            <p>Joanna Tan</p>
                        </Grid>
                        <Grid item sm={3}>
                        <img src={circle}/>
                            <p>Olivia Tang</p>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Box>
    )
}