import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Discussion from './Discussion';
import { useSelector, useDispatch } from 'react-redux';
import { fetchAllDiscussionsByCategory, selectAllDiscussions } from '../../../redux/slices/discussionsSlice';

const useStyles = makeStyles((theme) => ({
    root: {  
      
    },
    feedBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        height: '76vh',
        margin: '0 auto',
        flexWrap: 'nowrap',
        width: '82%',
        //height: '100%',
        overflowY: 'auto',
        overflowX: 'visible',
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
            width: theme.spacing(1)
          },
        '&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
          },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.primary.dark,
            borderRadius: '10px',
            //outline: '1px solid slategrey'
          }
        
    }
  }));

export default function DiscussionFeed() {

    const classes = useStyles();
    const dispatch = useDispatch();
    const selectedCategoryId = useSelector(state => state.categories.selectedCategory);
    const discussions = useSelector(selectAllDiscussions);

    const feed = () => {
        return discussions.map((discussion) => <Discussion key={discussion.id} discussion={discussion}></Discussion>)
    }

    useEffect(async () => {
        try{
            await dispatch(fetchAllDiscussionsByCategory(selectedCategoryId))
          } catch (error) {
          }
    }, [selectedCategoryId]);

    return (
      <>
        
        <div className={classes.feedBox}>
            {feed()}
        </div>
      </>
    );
}
