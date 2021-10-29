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
import { bookmarkToggled, unreadToggled } from '../../../redux/slices/forumSlice';
import MarkunreadMailboxRoundedIcon from '@material-ui/icons/MarkunreadMailboxRounded';
import BookmarksRoundedIcon from '@material-ui/icons/BookmarksRounded';


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

export default function BookmarkTree(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const bookmarkOpen = useSelector(state => state.forum.bookmark);
    const unreadOpen = useSelector(state => state.forum.unread);

    const bookmarked = useSelector(state => state.discussions.bookmarked);

    const handleBookmarkClick = () => {
        dispatch(bookmarkToggled());
    };

    const handleUnreadClick = () => {
        dispatch(unreadToggled());
    }

    const bookmarkedItems = () => {
        //should do this in a memoized selector
        return props.discussions.filter((discussion) => {return bookmarked.indexOf(discussion.id) !== -1})
                                .sort(sortByTimeStamp)
                                .map((discussion) => {return <TreeItem discussion={discussion}></TreeItem>})
    };

    const unreadItems = () => {
        return props.discussions.sort(sortByName)
                                .map((discussion) => {return <TreeItem discussion={discussion}></TreeItem>})
    };

    return (
        <>
            <ListItem button onClick={handleBookmarkClick}>
                <ListItemIcon>
                    <BookmarksRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Bookmarked" />
                    {bookmarkOpen ? <ExpandLess /> : <ExpandMore />}
                </ListItem>
            <Collapse in={bookmarkOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {bookmarkedItems()}
                </List> 
            </Collapse>
            <ListItem button onClick={handleUnreadClick}>
                <ListItemIcon>
                    <MarkunreadMailboxRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Unread" />
                    {unreadOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={unreadOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {unreadItems()}
                </List> 
            </Collapse>
        </>
            
            
       
    );

};
