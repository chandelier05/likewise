import React from 'react';
import { makeStyles} from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
    root : {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "flex-end",
        flexDirection: "column"
    },
    text : {
        padding: "0rem",
        fontWeight: "bold",
        fontSize: "0.7rem",
        lineHeight: "0.7rem",
        textTransform: "uppercase",
    },
    image : {
        width: "5rem",
        height: "5rem"
    }
}));

export default function UserPicture(props) {
    const classes = useStyles();
    let points = props.points ? props.points : 0;
    return (
        <div className={classes.root}>
            <img src={props.imgSrc} className={classes.image}/>
            <p className={classes.text} style={{color: "#88B5E1"}}>{props.username}</p>
            <p className={classes.text} style={{color: "#dddddd"}}>{points} POINTS</p>
            
        </div>
    )
}

//<p className={classes.text} style={{color: "#dddddd"}}>{props.major}</p>