import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AllCategoriesItem from './AllCategoriesItem';
import { Paper } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { selectAllCategories } from '../../../redux/slices/categoriesSlice';
import getRandomColor from '../../../util/getRandomColor';

const useStyles = makeStyles((theme) => ({
    root: {  
      
    },
    feedBox: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyItems: 'center',
        //ackgroundColor: '#212121ef',
        height: '76vh',
        margin: '0 auto',
        paddingTop: theme.spacing(2),
        flexWrap: 'wrap',
        width: '82%',
        minWidth: theme.spacing(42),
        //height: '100%',
        overflowY: 'auto',
        overflowX: 'hidden',
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

export default function AllCategoriesBox() {

    const classes = useStyles();
    const categories = useSelector(selectAllCategories);

    const categoryCards = () => {
        return categories.map((category) => <AllCategoriesItem key={category.id} category={category} random={getRandomColor()}></AllCategoriesItem>);
    }

    return (
        <Paper elevation={3} className={classes.feedBox}>
            {categoryCards()}
        </Paper>
    );
    }