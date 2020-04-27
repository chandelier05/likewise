import React, { useState, useEffect } from 'react';
import UserPicture from '../../assets/userImg.PNG';
import {Grid, Container} from '@material-ui/core';
import { makeStyles} from '@material-ui/core/styles';
import firebase from 'firebase';
import SearchBar, { TagInput } from "../../components/Searchbar/searchbar";
import PostPreview from '../../components/PostPreview';

const useStyles = makeStyles(theme => ({

}))

export default function AccountPage(props) {
  const tempPostData = {
    preview: "Testing title",
    body: "This a post I made and want to edit",
    uid: "4nPvDFfV9rXXwCkQEBohdQUH3Mb2",
    likes: 2,
    timestamp: "Fri Apr 24 2020 15:00:57 GMT-0700 (Pacific Daylight Time)",
    pid: "fake id",
    commentCount: 0
  }
  return (
    <Container maxWidth="lg">
      <Grid container>
        <Grid item xs={8}>
          <h1>Posts: </h1>
          <PostPreview postData={tempPostData}/>
        </Grid>
        <Grid item xs={4}>
          <div>
            
          </div>
        </Grid>
      </Grid>
    </Container>
  );
}