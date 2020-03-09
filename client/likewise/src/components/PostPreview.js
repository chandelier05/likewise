import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    padding: "2rem 1rem",
    '&:last-child': {
        paddingBottom: "2rem",
      },
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    
  },
  content: {
    flex: '0 1 auto',
    padding: '0rem 1rem',
    '&:last-child': {
        paddingBottom: '3.5rem',
      },
  },
  cover: {
    width: "250px",
    margin: "0.5rem 0.5rem",
  },
}));

export default function PostPreview(props) {
  const classes = useStyles();
  
  return (
      <Card className={classes.root}>
        <CardMedia
            className={classes.cover}
            image={props.userImg}
            title="Picture of user"
        />
        <div className={classes.details}>
            <CardContent className={classes.content}>
                <Typography component="p" style={{padding: "0px 10px"}}>
                    {props.preview}
                </Typography>
            </CardContent>
        </div>
      </Card>
  )
}