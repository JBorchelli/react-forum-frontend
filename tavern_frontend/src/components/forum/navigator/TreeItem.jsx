import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { selectUserById, selectUserColor } from '../../../redux/slices/usersSlice';
import { useSelector } from 'react-redux';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { Avatar } from '@material-ui/core';
import dnd from '../../../fake_api/conanIcon.jpg';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flexGrow: 9,
        margin: '0 auto',
    },
    nested: {
        paddingLeft: theme.spacing(4),
    },
    avatar: {

    }
}));

export default function TreeItem(props) {

    const classes = useStyles();
    const user = useSelector(state => selectUserById(state, props.discussion.user.id));
    const userColor = useSelector(state => selectUserColor(state, user.id));

    return (
        <ListItem button className={classes.nested} >
            <ListItemIcon>
                <Avatar aria-label="user-avatar" 
                        className={classes.avatar} 
                        src={user ? (user.id == 1 ? dnd : "") : ""} 
                        style={{backgroundColor: userColor ? userColor.main : "#333333", color: userColor ? userColor.contrast : "#ffffff"}}
                >
                    {user ? user.username[0] : ""}
                </Avatar>
            </ListItemIcon>
            <ListItemText primary={props.discussion.title} />
        </ListItem>
    );

};