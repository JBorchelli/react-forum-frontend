import React from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import DarkModeToggle from './DarkModeToggle'
import './MainBar.modules.scss';
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    zIndex: theme.zIndex.drawer + 1,
  },
  appbar: {
    
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

export default function MainBar() {
  const classes = useStyles();
  const theme = useTheme();
  let history = useHistory();
  const darkMode = useSelector(state => state.preferences.darkMode);

  const goToForum = () => {
    history.push("/forum");
  };

  const goToTomb = () => {
    history.push("/tomb");
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" 
              className={classes.appbar}
              style={{backgroundColor: darkMode ? theme.palette.background.dark : theme.palette.primary.main}}        
      >
        <Toolbar className={darkMode ? "toolbar-dark" : "toolbar-light"}>
          <IconButton edge="start" className={classes.menuButton} color={"inherit"} aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h5" className={classes.title}>
            Forum 
          </Typography>
          <DarkModeToggle ></DarkModeToggle>
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}
