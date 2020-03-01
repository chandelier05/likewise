import React from 'react';
import { AppBar, Toolbar, Typography, makeStyles} from '@material-ui/core';


const useStyles = makeStyles(theme => ({
    root: {
      flexGrow: 1,
      color: "8481E2",
    },
  }));

export default function Navbar(props) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{backgroundColor: "#8481E2"}} className="nav-content">
                <Toolbar>
                    <Typography variant="h6">
                        Test
                    </Typography>
                </Toolbar>
            </AppBar>
        </div>
    );
}