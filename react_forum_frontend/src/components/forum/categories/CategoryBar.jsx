import React, { useEffect, useRef, useState, useMemo } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { Paper } from '@material-ui/core';
import { categorySelected, fetchCategoriesByParty } from '../../../redux/slices/categoriesSlice';
import CategoryBarItem from './CategoryBarItem';
import { useSelector, useDispatch } from 'react-redux';
import ArrowBackRoundedIcon from '@material-ui/icons/ArrowBackRounded';
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded';
import getRandomColor from '../../../util/getRandomColor';
import "./CategoryBar.modules.scss";


const useStyles = makeStyles((theme) => ({
    root: {  
      display: 'flex',
      '& > *': {
        margin: 0,
        width: '100%',
        height: theme.spacing(12)
      },
    },
    barPaper: {
        display: 'flex',
        width: '100%',
        justifyContent: 'flex-start',
        //backgroundColor: theme.palette.background.paper,
        alignContent: 'stretch',
        flexwrap: 'nowrap',
        overflowY: 'hidden',
        overflowX: 'scroll',
        scrollBehavior: 'smooth',
        '&::-webkit-scrollbar': {
            height: '0px'
          }
        /*'&::-webkit-scrollbar-track': {
            boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
            webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
          },
        '&::-webkit-scrollbar-thumb': {
            backgroundColor: 'rgba(0,0,0,.1)',
            outline: '1px solid slategrey'
          }*/
    },
    scrollButtonLeft: {
      position: 'relative',
      left: 0,
      top: 0,
      width: theme.spacing(4),
      paddingLeft: "3px",
      //backgroundColor: theme.palette.primary.dark,
      paddingTop: "36px",
      borderRadius: '4px',
      cursor: 'pointer',
      color: "#ffffff",

      
    },
    scrollButtonRight: {
      position: 'relative',
      right: 0,
      top: 0,
      width: theme.spacing(4),
      //backgroundColor: theme.palette.primary.dark,
      paddingTop: "36px",
      paddingLeft: "3px",
      borderRadius: '4px',
      cursor: 'pointer',
      color: "#ffffff",

      
    },
    /*scrollButtonLeftHover: {
      position: 'relative',
      left: 0,
      top: 0,
      width: theme.spacing(4),
      paddingLeft: "3px",
      backgroundColor: theme.palette.secondary.main,
      paddingTop: "36px",
      borderRadius: '4px',
      cursor: 'pointer',
      color: '#ffffff',

      
    },
    scrollButtonRightHover: {
      position: 'relative',
      right: 0,
      top: 0,
      width: theme.spacing(4),
      backgroundColor: theme.palette.action.hover,
      paddingTop: "36px",
      paddingLeft: "3px",
      borderRadius: '4px',
      cursor: 'pointer',
      color: "#ffffff",

      
    },*/
    scrollButtonLeftHidden: {
      //display: 'none'
      visibility: 'hidden',
      position: 'relative',
      left: 0,
      top: 0,
      width: theme.spacing(3),
      backgroundColor: theme.palette.secondary.main,
      paddingTop: "36px",
      borderRadius: '4px'
    },
    scrollButtonRightHidden: {
      //display: 'none'
      visibility: 'hidden',
      position: 'relative',
      right: 0,
      top: 0,
      width: theme.spacing(3),
      backgroundColor: theme.palette.secondary.main,
      paddingTop: "36px",
      borderRadius: '4px'
    }
    
  }));

export default function CategoryBar() {

    const barRef = useRef();
    const [scrollLeft, setScrollLeft] = useState(0);
    const [scrollLeftHovered, setScrollLeftHovered] = useState(false);
    const [scrollRightHovered, setScrollRightHovered] = useState(false);

    const dispatch = useDispatch();
    const darkMode = useSelector(state => state.preferences.darkMode);
    const theme = useTheme();
    const selectedParty = useSelector(state => state.parties.selectedParty);
    const categoriesLoading = useSelector(state => state.categories.loading);

    const classes = useStyles();

    const categories = useSelector(state => state.categories.entities);

    const handleScroll = () => {
      setScrollLeft(barRef.current.scrollLeft);
    };

    const handleClickLeft = () => {
      barRef.current.scrollLeft -= 384;
    };

    const handleClickRight = () => {
      barRef.current.scrollLeft += 384;
    };

    const maxScrollLeft = () => {
      return barRef.current ? barRef.current.scrollWidth - barRef.current.clientWidth : 0;
    };

    const atMaxScroll = () => {
      return scrollLeft === maxScrollLeft();
    };

    const enterScrollLeft = () => {
      setScrollLeftHovered(true);
    };

    const exitScrollLeft = () => {
      setScrollLeftHovered(false);
    };

    const enterScrollRight = () => {
      setScrollRightHovered(true);
    };

    const exitScrollRight = () => {
      setScrollRightHovered(false);
    };

    const createCategoryItems = () => {
    
        const categoryItems = [];

        for (const category of Object.values(categories)) {
          categoryItems.push(<CategoryBarItem key={category.id} category={category} random={getRandomColor()}></CategoryBarItem>)
        };

        return categoryItems;
    };

    useEffect(async () => {
      try{
          await dispatch(fetchCategoriesByParty(selectedParty))
        } catch (error) {
          console.log(error)
        }
  }, [selectedParty]);

    return (
        <Paper elevation={3} className={classes.root}>
            <div className={scrollLeft === 0 ? classes.scrollButtonLeftHidden : classes.scrollButtonLeft} 
                 onClick={handleClickLeft}
                 onMouseEnter={enterScrollLeft}
                 onMouseLeave={exitScrollLeft}
                 style={{backgroundColor: darkMode ? 
                                          (scrollLeftHovered ? theme.palette.primary.main : theme.palette.primary.dark) : 
                                          (scrollLeftHovered ? theme.palette.primary.dark : theme.palette.primary.main)
                        }}     
            >
                <ArrowBackRoundedIcon />
            </div>
            <div ref={barRef} className={classes.barPaper}  onScroll={handleScroll}>
                {createCategoryItems()}
            </div>
            <div className={atMaxScroll() ? classes.scrollButtonRightHidden : classes.scrollButtonRight} 
                 onClick={handleClickRight}
                 onMouseEnter={enterScrollRight}
                 onMouseLeave={exitScrollRight}
                 style={{backgroundColor: darkMode ? 
                                          (scrollRightHovered ? theme.palette.primary.main : theme.palette.primary.dark) : 
                                          (scrollRightHovered ? theme.palette.primary.dark : theme.palette.primary.main)
                        }}
            >
                <ArrowForwardRoundedIcon />
            </div>
        </Paper>
    );
}