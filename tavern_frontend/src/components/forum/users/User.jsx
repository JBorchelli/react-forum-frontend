import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Badge } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { selectUserColor, setUserColor } from '../../../redux/slices/usersSlice';
import Avatar from '@material-ui/core/Avatar';
import getRandomColor from '../../../util/getRandomColor';
import dnd from '../../../fake_api/conanIcon.jpg';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
    root: {  
        
        display: 'flex',
        width: '85%',
        height: theme.spacing(10),
        margin: '0 auto',
        borderRadius: '6px',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: theme.palette.action.hover
        }
    },
    avatarBox: {
        padding: theme.spacing(1),
        paddingTop: theme.spacing(2),
    },
    infoBox: {
        padding: theme.spacing(1),
        paddingTop: theme.spacing(2)
    },
    username: {
        
    },
    status: {
        fontSize: '0.9rem',

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
    const dispatch = useDispatch();
    const userColor = useSelector(state => selectUserColor(state, props.user.id));
    if(!userColor){
        dispatch(setUserColor({id: props.user.id, color: getRandomColor()}));
    }
    
    const badge = {
        'online': () => {return classes.badgeOnline;},
        'idle': () => {return classes.badgeIdle;},
        'busy': () => {return classes.badgeBusy;},
        'offline': () => {return classes.badgeOffline;}
    };

    return (
        
            <div className={classes.root}>
                <div className={classes.avatarBox}>
                    <Badge 
                        classes={{ badge: badge['online']() }} //hardcoded cuz backend has no status attribute yet
                        badgeContent=" " 
                        overlap="circle"
                        variant="dot"
                        anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'right',
                        }} 
                    >
                        <Avatar aria-label="user-avatar" className={classes.avatar} src={props.user.id == 1 ? dnd : props.user.avatarImg} style={{backgroundColor: userColor ? userColor.main : "#333333", color: userColor ? userColor.contrast : "#ffffff"}}>
                            {props.user.username[0]}
                        </Avatar>
                    </Badge>
                </div>
                <div className={classes.infoBox}>
                    <Typography className={classes.username}>{props.user.username}</Typography>
                    <Typography className={classes.status}>{/*props.user.status*/'online'}</Typography>
                </div>
            </div>
        
        
    );
}