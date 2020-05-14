import React from 'react';
import userImg from '../../assets/userImg.PNG';
import Paw from "../../assets/paw.png"
import {makeStyles} from '@material-ui/core/styles';
import {ReactComponent as ThiccDubs} from '../../assets/thicc-lil-dubs.svg';

const useStyles = makeStyles(theme => ({
  cardArea: {
    display: "flex",
    border: "0.2em solid transparent",
    flex: '1',
    borderRadius: "1em",
    zIndex: "1",
    flexDirection: 'row',
    background: 'linear-gradient(#fff,#fff) padding-box, linear-gradient(to right, #88B5E1, #9188AB) border-box',
    borderImageSlice: 1,
    boxShadow: '0px 4px 8px 0px rgba(0,0,0,0.2)',
    flexWrap: 'wrap',
    margin: '1rem'
  },
  userImg: {
    maxWidth: "9em",
    height: '100%',
    width: '100%',
    textAlign: 'center',
    margin: '1em 1em',
    flex: '0 1 4em'
  },
  detailBox: {
    order: 2,
    minWidth: '5rem',
    maxWidth: '40rem',
    flex:' 1 1 5rem',
    flexDirection: 'column',
    fontStyle: "italic",
    fontWeight: "normal",
    fontSize: "1.2em",
    margin: '1em',
    "& h2" : {
      flex: '1 1 5em'
    }
  },
  utilityRow : {
    display: 'flex',
    flexDirection: 'row',
    minWidth: '5rem',
    maxWidth: '40rem',
    flex: '1 1 5rem',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  detailGroup: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    flex: '0 1 auto',
    "& p" : {
      color: "#707070",
      margin: "0em"
    },
    whiteSpace: 'nowrap'
  },
  detailGroup2: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: "0em 0em 0em 5em",
    flex: '0 1 auto',
    "& p" : {
      color: "#707070",
      margin: "0em"
    },
    whiteSpace: 'nowrap',
  },
  paw: {
    width: "2em",
    height: "2em",
    textAlign: "center",
  },
  button: {
    display:"inline-block",
    color:"#FFF",
    borderRadius: '0.5rem',
    padding: '0.3rem 1rem',
    border: 'none',
    textDecoration:"none",
    "&:hover": {
      background: 'rgb(90,85,106)',
      background: 'linear-gradient(90deg, rgba(90,85,106,1) 0%, rgba(94,129,163,1) 100%)'
    },
    background: 'rgb(145,136,171)',
    background: 'linear-gradient(90deg, rgba(145,136,171,1) 0%, rgba(136,181,225,1) 100%)',
    fontSize: '1rem'
  },
  username: {
    fontWeight: 600,
    fontStyle: 'italic',
    fontSize: '1.5em',
    padding: '0',
    margin: '0 0 2em 0',
  }
}));

export default function UserCard(props) {
const classes = useStyles();
return (
  <div className={classes.cardArea}>
    <img src={userImg} className={classes.userImg}/>
    <div className={classes.detailBox}>
      <h2 className={classes.username}>
        {props.displayName}
      </h2>
      <div className={classes.utilityRow}>
        <div className={classes.detailGroup}>
          <img src={Paw} className={classes.paw}/>
          <p>{props.likes}</p>
        </div>
        <div className={classes.detailGroup2}> 
          <button className={classes.button} onClick={() => {props.handleViewPosts(props.uid)}}>View posts</button>
        </div>
      </div>
    </div>
  </div>
)
}