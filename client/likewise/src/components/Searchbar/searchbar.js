'use strict';

import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import InputBase from '@material-ui/core/InputBase';

import Button from '@material-ui/core/Button';

const BootstrapInput = withStyles(theme => ({
  root: {
    'label + &': {
      marginTop: theme.spacing(3),
    },
  },
  input: {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}))(InputBase);

const useStyles = makeStyles(theme => ({
  margin: {
    margin: theme.spacing(2),

  },
}));

const ButtonStyles = makeStyles(theme =>({
    button:{
        backgroundColor: "black",
        color:"white",
        margin:theme.spacing(2),
    },

}));



export default function CustomizedSelects() {
  const classes = useStyles();
  const [quarter, setQuarter] = React.useState('');
  const handleQuarterChange = event => {
    setQuarter(event.target.value);
  };

  const [sort, setSort] = React.useState('');
  const handleSortChange = event => {
    setSort(event.target.value);
  };
  return (
    <div className="searchbar">
        <div className="searchcontain">
      <FormControl className={classes.margin}>
        <InputLabel htmlFor="demo-customized-textbox"></InputLabel>
        <BootstrapInput id="demo-customized-textbox" placeholder="Search Tags..." defaultValue="Search Tags..."/>
      </FormControl>
      <FormControl className={classes.margin}>
        <InputLabel id="demo-customized-select-label" variant="filled">Quarter</InputLabel>
        <Select
          labelId="demo-customized-select-label"
          id="demo-customized-select"
          value={quarter}
          onChange={handleQuarterChange}
          input={<BootstrapInput />}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>Autumn</MenuItem>
          <MenuItem value={20}>Winter</MenuItem>
          <MenuItem value={30}>Spring</MenuItem>
          <MenuItem value={30}>Fall</MenuItem>
        </Select>
      </FormControl>

      <FormControl className={classes.margin}>
        <InputLabel variant="Outlined" htmlFor="demo-customized-textbox">Year...</InputLabel>
        <BootstrapInput id="demo-customized-textbox" defaultValue="Year..." />
      </FormControl>

      <FormControl className={classes.button}>
          <div id="searchbutton"><Button variant="contained"  size="large" style={{color:"white"}}>Search</Button></div>
      </FormControl>
      <FormControl className={classes.margin}>
          <div id="sortdrop">          
              <label>Sort by:</label>
             <InputLabel variant="filled" htmlFor="demo-customized-select-native" >Default</InputLabel>
             </div>
        <NativeSelect
          id="demo-customized-select-native"
          value={sort}
          onChange={handleSortChange}
          input={<BootstrapInput />}
        >
          <option value="" />
          <option value={1}>Year</option>
          <option value={2}>Time</option>
          <option value={3}>Popularity</option>
        </NativeSelect>
      </FormControl>
      </div>
    </div>
  );
}
