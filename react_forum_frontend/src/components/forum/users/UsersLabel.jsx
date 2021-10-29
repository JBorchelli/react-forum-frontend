import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Typography } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {  
        position: 'relative',
        width: '100%',
        height: '100%',
        margin: '0 auto',
    },
    paper: {
        
    }
  }));

export default function Users() {

    const classes = useStyles();

    return (
        <Paper className={classes.root}>
            <Typography>Party Members</Typography>
        </Paper>
    );
}