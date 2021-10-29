import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Skeleton from '@material-ui/lab/Skeleton';
import { Paper } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { fetchUsersByParty, selectAllUsers } from '../../../redux/slices/usersSlice';
import User from './User';

const useStyles = makeStyles((theme) => ({
    root: {  
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        height: '100%',
        margin: '0 auto',
        paddingTop: theme.spacing(1),
        overflowX: 'hidden',
        overflowY: 'auto',
    },
    paper: {
        
    }
  }));

export default function Users(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedParty = useSelector(state => state.parties.selectedParty);
    const users = useSelector(state => selectAllUsers(state));
    //const usersLoading = useSelector(state => state.users.loading);
    const usersLoading = false;

    const userItems = () => {
        const userItems = [];
        for (const user of Object.values(users)) {
            userItems.push(<User key={user.id} user={user} ></User>)
        };
        
        return userItems;
    }

    useEffect(async () => {
        try{
            await dispatch(fetchUsersByParty(selectedParty))
          } catch (error) {
            console.log(error)
          }
    }, [selectedParty]);

    return (
        <Paper className={classes.root}>
            {usersLoading ? <Skeleton /> : userItems()}
        </Paper>
    );
}
