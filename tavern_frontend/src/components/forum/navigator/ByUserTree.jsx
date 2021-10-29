import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import TreeItem from './TreeItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import {sortByTimeStamp, sortByName} from '../../../util/sorts';
import { selectAllUsers } from '../../../redux/slices/usersSlice';
import { userToggled } from '../../../redux/slices/forumSlice';
import PersonRoundedIcon from '@material-ui/icons/PersonRounded';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        //height: '75%',
        flexGrow: 9,
        margin: '0 auto',
        //backgroundColor: theme.palette.info.light
    },
    nested: {
        paddingLeft: theme.spacing(4),
      },
}));

export default function ByUserTree(props) {

    const classes = useStyles();
    const dispatch = useDispatch();

    const users = useSelector(state => selectAllUsers(state));

    const usersOpen = useSelector(state => state.forum.user);

    const handleClick = (id) => {
        dispatch(userToggled(id))
    };

    const userItems = (id) => {
        return props.discussions.filter((discussion) => {return discussion.user.id === id})
                                .sort(sortByTimeStamp)
                                .map((discussion) => {return <TreeItem discussion={discussion}></TreeItem>})
    };

    const userHeaders = () => {
        return users.sort(sortByName).map((user) => {
            return <>
                <ListItem button onClick={() => {handleClick(user.id)}}>
                    <ListItemIcon>
                        <PersonRoundedIcon />
                    </ListItemIcon>
                    <ListItemText primary={user.username} />
                        {usersOpen[user.id] ? <ExpandLess /> : <ExpandMore />}
                    </ListItem>
                <Collapse in={usersOpen[user.id]} timeout="auto" unmountOnExit>
                    <List component="div" disablePadding>
                        {userItems(user.id)}
                    </List> 
                </Collapse>
            </>
        })
    };

    return (
        <>
            {userHeaders()}
        </>
            
            
       
    );

};
