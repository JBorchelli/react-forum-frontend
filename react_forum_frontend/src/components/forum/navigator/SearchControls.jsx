import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        //height: '15%',
        height: theme.spacing(12),
        flexGrow: 0,
        flexShrink: 0,
        margin: '0 auto',
        //borderRadius: '0px',
        backgroundColor: theme.palette.background.paper
    }
}));

export default function SearchControls(props) {

    const classes = useStyles();
    const theme = useTheme();

    const darkMode = useSelector(state => state.preferences.darkMode);

    return (
        <Paper elevation={1} className={classes.root} style={{backgroundColor: darkMode ? theme.palette.background.dark : theme.palette.background.paper}}></Paper>
    );

};
