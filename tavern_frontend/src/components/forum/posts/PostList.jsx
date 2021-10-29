import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import { selectPostsByDiscussion, fetchAllPostsByDiscussion } from '../../../redux/slices/postsSlice';
import Post from './Post';

const useStyles = makeStyles((theme) => ({
    root: {  
      
    },
    feedBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        height: 'auto',
        marginLeft: 'auto',
        paddingTop: theme.spacing(3),
        flexWrap: 'nowrap',
        width: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
        transition: theme.transitions.create('height', {
            duration: theme.transitions.duration.leavingScreen,
        })
    },
    feedBoxCollapsed: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        backgroundColor: theme.palette.background.paper,
        height: '0px',
        marginLeft: 'auto',
        flexWrap: 'nowrap',
        width: '100%',
        overflowY: 'auto',
        overflowX: 'visible',
    }
  }));

export default function PostList(props) {

    const classes = useStyles();
    const dispatch = useDispatch();
    const posts = useSelector(state => selectPostsByDiscussion(state, props.discussionId));

    const feed = () => {
        const postItems = [];
        for (const post of Object.values(posts)) {
            postItems.push(<Post key={post.id} post={post}></Post>)
        };
        
        return postItems;
    }
    
    useEffect(async () => {
        try{
            await dispatch(fetchAllPostsByDiscussion(props.discussionId))
          } catch (error) {
          }
    }, []);
    
    return (
        <div className={props.expanded ? classes.feedBox : classes.feedBoxCollapsed}>
            {feed()}
        </div>
    );
}
