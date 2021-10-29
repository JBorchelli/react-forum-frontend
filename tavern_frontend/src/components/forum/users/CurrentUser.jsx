import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Badge, Paper } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector } from 'react-redux';
import { selectCurrentUser, selectUserColor } from '../../../redux/slices/usersSlice';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';

const useStyles = makeStyles((theme) => ({
    root: {  
        
        display: 'flex',
        justifyContent: 'center',
        alignContent: 'center',
        width: '85%',
        height: theme.spacing(10),
        margin: '0 auto',
        borderRadius: '10px',
        cursor: 'pointer',
        backgroundColor: theme.palette.background.paper,
        marginTop: theme.spacing(1),
        //border: '1px solid white',]

        '&:hover': {
            //backgroundColor: theme.palette.action.hover
            //border: '1px solid lightblue'
        }
    },
    avatarBox: {
        //backgroundColor: theme.palette.success.main,
        padding: theme.spacing(1),
        paddingTop: theme.spacing(2)+2,
        //margin: '0 auto'
    },
    infoBox: {
        //backgroundColor: theme.palette.success.light
        //backgroundColor: "#111111",
        padding: theme.spacing(1),
        paddingTop: theme.spacing(2)+2,
        //margin: '0 auto'
    },
    username: {
        paddingTop: theme.spacing(1)+1,
        paddingLeft: theme.spacing(1)+1,
    },
    status: {
        fontSize: '0.9rem',

    },
    controls: {
        paddingTop: theme.spacing(3)-1,
        
    },
    userSettings: {
        maxWidth: theme.spacing(2),
        //borderRadius: '20px'
    },
    badgeOnline: {
        backgroundColor: theme.palette.success.light,
        width: '11px',
        height: '11px',
        borderRadius: '20px'
    },
    badgeOffline: {
        backgroundColor: "#585858",
        width: '11px',
        height: '11px',
        borderRadius: '20px'
    },
    badgeIdle: {
        backgroundColor: theme.palette.info.light,
        width: '11px',
        height: '11px',
        borderRadius: '20px'
    },
    badgeBusy: {
        backgroundColor: theme.palette.error.light,
        width: '11px',
        height: '11px',
        borderRadius: '20px'
    }
  }));

export default function User(props) {

    const classes = useStyles();
    //const id = useSelector(state => state.users.currentUser);
    //const currentUser = useSelector(state => selectUserById(state, id));
    const currentUser = useSelector(selectCurrentUser);
    const userColor = useSelector(state => selectUserColor(state, currentUser ? currentUser.id : 1));

    const badge = {
        'online': () => {return classes.badgeOnline;},
        'idle': () => {return classes.badgeIdle;},
        'busy': () => {return classes.badgeBusy;},
        'offline': () => {return classes.badgeOffline;}
    };

    return (
        
            <Paper className={classes.root}>
                <div className={classes.avatarBox}>
                    <Badge 
                        classes={{ badge: badge[currentUser ? currentUser.status : 'offline'] }}
                        badgeContent=" " 
                        overlap="circle"
                        variant="dot"
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }} 
                    >
                        <Avatar aria-label="user-avatar" 
                                className={classes.avatar} 
                                src={currentUser ? currentUser.avatarImg: ""} 
                                style={{backgroundColor: userColor ? userColor.main : "#333333", color: userColor ? userColor.contrast : "#ffffff"}}
                        >
                            {currentUser ? currentUser.username[0] : ""}
                        </Avatar>
                    </Badge>
                </div>
                <div className={classes.infoBox}>
                    <Typography className={classes.username}>{currentUser ? currentUser.username : ""}</Typography>
                    <Typography className={classes.status}>{currentUser ? currentUser.status : ""}</Typography>
                </div>
                <div className={classes.controls}>
                    <Button className={classes.userSettings} aria-label="user settings" size='small'>
                        <SettingsRoundedIcon></SettingsRoundedIcon>
                    </Button>
                </div>
            </Paper>
        
        
    );
}