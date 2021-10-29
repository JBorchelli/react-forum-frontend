import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import SearchControls from './SearchControls';
import DiscussionTree from '../discussions/DiscussionTree';
import BottomControls from './BottomControls';
import { useSelector } from 'react-redux';
import { selectAllDiscussions } from '../../../redux/slices/discussionsSlice';

const useStyles = makeStyles((theme) => ({
    paper: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        margin: '0 auto',
        backgroundColor: theme.palette.background.paper
    }
  }));

export default function FeedNavigator() {

    const classes = useStyles();
    const discussions = useSelector(state => selectAllDiscussions(state));

    return (
        <Paper elevation={3} className={classes.paper}>
            <SearchControls></SearchControls>
            <DiscussionTree discussions={discussions}></DiscussionTree>
            <BottomControls></BottomControls>
        </Paper>
    );
}
