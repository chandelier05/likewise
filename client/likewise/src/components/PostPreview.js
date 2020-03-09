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
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  cover: {
    width: 151,
  }
}));

export default function PostPreview(props) {
    const classes = useStyles();

    <Card className={classes.root}>
        <CardMedia
            className={classes.cover}
            image={props.userImg}
            title="Picture of user"
        />
        <div className={classes.details}>
            <CardContent className={classes.content}>
                <Typography component="p">
                    {props.preview}
                </Typography>
            </CardContent>
        </div>
    </Card>
}