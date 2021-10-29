import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector } from 'react-redux';
import List from '@material-ui/core/List';
import RecentTree from '../navigator/RecentTree';
import ByUserTree from '../navigator/ByUserTree';
import BookmarkTree from '../navigator/BookmarkTree';


const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        //height: '75%',
        flexGrow: 9,
        margin: '0 auto',
        overflowX: 'hidden',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
            width: theme.spacing(1)
          },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
          },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.light,
            borderRadius: '10px',
          }
    },
    nested: {
        paddingLeft: theme.spacing(4),
      },
}));

export default function DiscussionTree(props) {

    const classes = useStyles();
    
    const navMode = useSelector(state => state.forum.navMode);

    const treeTitle = {
        0: "Recent",
        1: "By User",
        2: "Bookmarked",
        'default': "Discussion Tree"
    };

    const getTree = {
        0: () => {return <RecentTree discussions={props.discussions}></RecentTree>},
        1: () => {return <ByUserTree discussions={props.discussions}></ByUserTree>},
        2: () => {return <BookmarkTree discussions={props.discussions}></BookmarkTree>},
        'default': () => {return <RecentTree discussions={props.discussions}></RecentTree>},
    }

    return (
        <div className={classes.root}>
            <List
                component="nav"
                aria-labelledby="nested-list-subheader"
            >
                {getTree[navMode]() || getTree['default']()}
            </List>
        </div>
    );

};
