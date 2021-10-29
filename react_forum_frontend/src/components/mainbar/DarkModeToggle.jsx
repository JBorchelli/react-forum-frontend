import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Brightness4TwoToneIcon from '@material-ui/icons/Brightness4TwoTone';
import Brightness5TwoToneIcon from '@material-ui/icons/Brightness5TwoTone';
import { useSelector, useDispatch } from 'react-redux';
import {darkModeDisabled, darkModeEnabled} from '../../redux/slices/preferencesSlice';
import { grey } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
      color: grey[100],
    },
  },
}));

export default function DarkModeToggle() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const darkMode = useSelector(state => state.preferences.darkMode);

  const lightModeIcon = <Brightness5TwoToneIcon></Brightness5TwoToneIcon>
  const darkModeIcon = <Brightness4TwoToneIcon></Brightness4TwoToneIcon>

  const handleClick = () => {
    if(darkMode) {
        dispatch(darkModeDisabled());
    }
    else {
        dispatch(darkModeEnabled());
    }
    
  };

  return (
    <div className={classes.root}>
        <Tooltip title={darkMode ? "Light Mode" : "Dark Mode"} placement="bottom">
            <IconButton aria-label={darkMode ? 'light-mode' : 'dark-mode'} onClick={() => handleClick()}>
                {darkMode ? lightModeIcon : darkModeIcon}
            </IconButton>
        </Tooltip>
    </div>
  );
}