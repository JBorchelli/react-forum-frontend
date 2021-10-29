import React from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { useSelector, useDispatch } from 'react-redux';
import {categoryDrawerToggled} from '../../redux/slices/forumSlice';
import CategoryItem from './CategoryItem';
import { lightBlue, grey } from '@material-ui/core/colors';

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    
  },
  menuButton: {
    marginRight: 36,
    //marginTop: 64,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    
    flexShrink: 0,
    whiteSpace: 'nowrap',
    //marginTop: 64,
  },
  drawerOpenLight: {
    width: drawerWidth,
    marginTop: 66,
    backgroundColor: grey[100],
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerCloseLight: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    marginTop: 66,
    backgroundColor: grey[100],
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },
  },
  drawerOpenDark: {
    width: drawerWidth,
    marginTop: 66,
    backgroundColor: grey[900],
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerCloseDark: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    marginTop: 66,
    backgroundColor: grey[900],
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(8) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  title: {
      paddingRight: theme.spacing(5),
  }
}));

export default function CategoryDrawer() {
  const theme = useTheme();
  const classes = useStyles();
 

  const dispatch = useDispatch();
  const drawerOpen = useSelector(state => state.forum.categoryDrawerOpen);
  const darkMode = useSelector(state => state.preferences.darkMode);

  const handleDrawerToggle = () => {
    dispatch(categoryDrawerToggled());
  };

  const categories = useSelector(state => state.categories.entities);

  const createCategoryItems = () => {
    
    const categoryItems = [];

    for (const category of Object.values(categories)) {
      categoryItems.push(<CategoryItem category={category}></CategoryItem>)
    };

    return categoryItems;
  }

  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpenDark]: drawerOpen&&darkMode,
          [classes.drawerCloseDark]: !drawerOpen&&darkMode,
          [classes.drawerOpenLight]: drawerOpen&&!darkMode,
          [classes.drawerCloseLight]: !drawerOpen&&!darkMode,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpenDark]: drawerOpen&&darkMode,
            [classes.drawerCloseDark]: !drawerOpen&&darkMode,
            [classes.drawerOpenLight]: drawerOpen&&!darkMode,
            [classes.drawerCloseLight]: !drawerOpen&&!darkMode,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Typography variant="h6" className={classes.title}>
            Categories
          </Typography>
          <IconButton onClick={handleDrawerToggle}>
            {drawerOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        {createCategoryItems()}
      </Drawer>
    </div>
  );
}