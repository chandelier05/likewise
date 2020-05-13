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
    '&:hover': {
      background: 'linear-gradient(#fff,#fff) padding-box, linear-gradient(to right, #5d7a96, #585269) border-box',
    },
    width: '34rem',
    margin: '1rem'
  },
  userImg: {
    width: "4rem",
    height: '100%',
    minWidth: '8rem',
    textAlign: 'center',
    margin: '2em 2em'
  },
  detailBox: {
    order: 2,
    flex: '2 1 auto',
    flexDirection: 'column',
    fontStyle: "italic",
    fontWeight: "normal",
    fontSize: "1.2em",
    justifyContent: 'space-between',
    margin: '2em 8em 2em 2em',
    width: '46em',
    "& h2" : {
      flex: '1 1 5em'
    }
  },
  utilityRow : {
    display: 'flex',
    flexDirection: 'row',
    flex: '0 1 auto',
    alignItems: 'center',
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
      backgroundColor: "#d5d5d5"
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
        Username
      </h2>
      <div className={classes.utilityRow}>
        <div className={classes.detailGroup}>
          <img src={Paw} className={classes.paw}/>
          <p>TEMP LIKES</p>
        </div>
        <div className={classes.detailGroup2}> 
          <button className={classes.button}>View posts</button>
        </div>
      </div>
    </div>
  </div>
)
}