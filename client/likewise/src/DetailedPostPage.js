import React, {useEffect, useState} from 'react';
import firebase from 'firebase'
import UserPicture from './components/UserPicture';
import examplePicture from './assets/userImg.PNG';
import {Grid, Container, Box, Button} from '@material-ui/core';
import {makeStyles} from '@material-ui/core/styles';
import DetailedPost from './components/DetailedPost';
import Comment from './components/Comment';

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

export default function DetailedPostPage(props) {
  //TO-DO: REPLACE TEMPORARY USER VARIABLES
 
  return (
    <Container maxWidth="sm">
      <Grid container>
        <Grid item xs={8}>
          <Box>
            <DetailedPost/>
          </Box>
          <Box>
            <Comment/>
          </Box>
        </Grid>
        <Grid item xs={4}>

        </Grid>
      </Grid>
    </Container>
  );
}