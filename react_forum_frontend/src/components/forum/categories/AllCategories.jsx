import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, IconButton, Typography } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import AppsRoundedIcon from '@material-ui/icons/AppsRounded';
import { categorySelected, setShowAllCategories, previousCategorySet } from '../../../redux/slices/categoriesSlice';


const useStyles = makeStyles((theme) => ({
    root: {  
      
    },
    paper: {
        position: 'relative',
        width: '100%',
        minWidth: theme.spacing(13),
        height: theme.spacing(12),
        margin: '0 auto',
        cursor: 'pointer'
    },
    flexContainer: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        '&:hover' : {
            backgroundColor: theme.palette.action.hover
        }
    },
    containerSelected: {
        display: 'flex',
        height: '100%',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: theme.palette.action.hover
    },
    icon: {
        fontSize: '60px',
        
    },
    label: {
        
    },
    selectIndicator: {
        backgroundColor: theme.palette.primary.main,
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: "4px",
        borderRadius: "2px",
        transition: theme.transitions.create('all', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        })
      },
      hidden: {
        width: "0%",
        position: 'absolute',
        bottom: 0,
        left: "48px",
        height: "3px",
        borderRadius: "2px",
      }
  }));

export default function AllCategories() {

    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.preferences.darkMode);
    const allCategoriesSelected = useSelector(state => state.categories.showAllCategories);
    const current = useSelector(state => state.categories.selectedCategory);
    const previous = useSelector(state => state.categories.previousCategory);
    const classes = useStyles();

    const handleClick = () => {
        if(allCategoriesSelected) {
            dispatch(setShowAllCategories(false));
            dispatch(categorySelected(previous));
        } else {
            dispatch(setShowAllCategories(true));
            dispatch(previousCategorySet(current));
            dispatch(categorySelected(""));
        }
    }

    return (
        <Paper className={classes.paper} onClick={handleClick}>
            <div className={allCategoriesSelected ? classes.containerSelected: classes.flexContainer}>
                <AppsRoundedIcon className={classes.icon}></AppsRoundedIcon>
                <Typography className={classes.label}>All Categories</Typography>
            </div>
            <div className={allCategoriesSelected ? classes.selectIndicator : classes.hidden} ></div>
        </Paper>
    );
}
