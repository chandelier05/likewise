import React from 'react';
import PostPreview from './components/PostPreview';
import circle from './assets/Feature1.png';
import Grid from '@material-ui/core/Grid';
import { makeStyles, useTheme } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    padding: "1.2rem",
  }
}))
export default function PostNavigationPage(props) {
  const classes = useStyles();
  return (
  <Grid container className={classes.root}>
    <Grid item xs={12}>
      <PostPreview preview="Lorem ipsum dolor sit amet, nonumes 
      referrentur mel an, sed ea maiorum contentiones, alia stet quando ei vix. 
      Ut choro comprehensam vis, est id sale reprimique. Et sit ullum repudiandae. 
      Usu in idque possit euripidis. Id minim accusata qui, ei eam sumo reformidans. 
      Ipsum inermis sed id." userImg={circle}/>
    </Grid>
  </Grid>   
  )
}