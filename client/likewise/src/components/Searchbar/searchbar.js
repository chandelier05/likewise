'use strict';
import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import '../../App.css';

const useStyles = makeStyles(theme => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function SearchBar() {
    const classes = useStyles();
    const [quarter, setQuarter] = React.useState('');

    const inputLabel = React.useRef(null);

    const handleChange = event => {
        setQuarter(event.target.value);
    };

    return (
        <div className="searchbar">
            <div id="barcontain">
            <FormControl className={classes.formControl} variant="outlined">
                <TextField
                    id="tagsearch"
                    label="Search Tags..."
                    color="secondary"
                    variant="outlined" />
            </FormControl>
            <FormControl className={classes.formControl} variant="outlined">
                <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                    Age
                </InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={quarter}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Autumn"}>Autumn</MenuItem>
                    <MenuItem value={"Winter"}>Winter</MenuItem>
                    <MenuItem value={"Spring"}>Spring</MenuItem>
                    <MenuItem value={"Summer"}>Summer</MenuItem>
                </Select>
            </FormControl>
            <FormControl className={classes.formControl} variant="outlined">
                <TextField
                    id="yearsearch"
                    label="Year..."
                    variant="outlined"
                    color="secondary"
                />
            </FormControl>
            <FormControl className={classes.formControl}>
                <Button variant="contained" id="signup" size="large" style={{background: "black",color:"white"}}>Search</Button>
            </FormControl>
            <FormControl className={classes.formControl} variant="outlined">
                <InputLabel ref={inputLabel} id="demo-simple-select-outlined-label">
                    Age
                </InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={quarter}
                    onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={"Autumn"}>Autumn</MenuItem>
                    <MenuItem value={"Winter"}>Winter</MenuItem>
                    <MenuItem value={"Spring"}>Spring</MenuItem>
                    <MenuItem value={"Summer"}>Summer</MenuItem>
                </Select>
            </FormControl>
            </div>
        </div>
    );
}
