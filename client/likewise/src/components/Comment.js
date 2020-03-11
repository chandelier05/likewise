import React, {useEffect, useState} from 'react';
import firebase from 'firebase'
import UserPicture from './UserPicture';
import examplePicture from '../assets/userImg.PNG';
import {Grid, Container, Box, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root : {

  },
  summary: {
    fontWeight: "bold",
    fontSize: "1rem", 
    color: "#9188AB"
  },
  postOutline: {
    border: "1px solid #9188AB",

  },
  post: {
    display: "flex",
  }
}));

export default function Comment(props) {
    const classes = useStyles();
    const userImg = examplePicture;
    const major = "Informatics";
    const points = 1200;
    return (
      <div>
        <h1>Replies</h1>
        <Grid container class={classes.post}>
          <Grid item xs={2} style={{margin: "1rem"}}>
            <UserPicture imgSrc={userImg} major={major} points={points} />
          </Grid>
          <Grid item xs={10}>
            <Box class={classes.postOutline}>
                <p>
                    Lorem ipsum dolor sit amet, ea erat accusamus vix. Duo ea exerci propriae constituto, 
                    tation intellegebat ne mel. Cum iuvaret tibique splendide et, in elit fierent maiestatis mei. 
                    Ius te novum officiis assueverit.
                    Nam dicta solet delicatissimi et, id vel tantas appareat assueverit, 
                    ad possit integre docendi ius. Eu qui platonem persequeris. Ei corpora detracto vis, 
                    eum ea scaevola temporibus. Has aliquip tibique facilisis ad, movet laoreet persequeris at pri, 
                    novum offendit eloquentiam duo ne.
                </p>
                <p>Jan 1, 2020    1:39AM      Winter Quarter</p>
                <Button variant="outlined" style={{border: "solid 1px #9188AB", margin: "0rem 1rem"}}>Reply</Button>
                <Button variant="contained" style={{backgroundColor: "#9188AB", margin: "0rem 1rem"}}>Report</Button>
            </Box>
          </Grid>
        </Grid>
        </div>
    )
}