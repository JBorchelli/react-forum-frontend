import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Paper from '@material-ui/core/Paper';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';
import RestoreIcon from '@material-ui/icons/Restore';
import PeopleAltRoundedIcon from '@material-ui/icons/PeopleAltRounded';
import BookmarksRoundedIcon from '@material-ui/icons/BookmarksRounded';
import {navModeChanged} from '../../../redux/slices/forumSlice';

const useStyles = makeStyles((theme) => ({
    rootDark: {
        width: '100%',
        height: theme.spacing(8),
        flexGrow: 0,
        flexShrink: 0,
        margin: '0 auto',
        backgroundColor: theme.palette.background.paper,
        //borderRadius: '0px',
        overflow: 'none'
    },
    rootLight: {
        width: '100%',
        height: theme.spacing(8),
        flexGrow: 0,
        flexShrink: 0,
        margin: '0 auto',
        backgroundColor: theme.palette.background.paper,
        //borderRadius: '0px',
        overflow: 'none'
    },
    bottomNavigation: {
        color: theme.palette.background.dark
    },
    selectedDark: {
        color: theme.palette.primary.main,
    },
    selectedLight: {
        color: theme.palette.primary.dark,
    },
    colorSecondaryDark: {
        color: theme.palette.primary.main,
    },
    colorSecondaryLight: {
        color: theme.palette.primary.dark,
    }
}));

export default function BottomControls(props) {

    const classes = useStyles();
    const theme = useTheme();

    const dispatch = useDispatch();
    const navMode = useSelector(state => state.forum.navMode);
    const darkMode = useSelector(state => state.preferences.darkMode);

    return (
        <Paper elevation={3} className={darkMode ? classes.rootDark : classes.rootLight}>
            <BottomNavigation
                value={navMode}
                onChange={(event, newValue) => {
                    dispatch(navModeChanged(newValue));
                }}
                style={{backgroundColor: darkMode ? theme.palette.background.dark : theme.palette.background.light}}
                className={darkMode ? classes.rootDark : classes.rootLight}
            >
                <BottomNavigationAction 
                    classes={{selected: darkMode ? classes.selectedDark : classes.selectedLight}} 
                    label="Recent" 
                    icon={ <RestoreIcon 
                                classes={{colorSecondary: darkMode ? classes.colorSecondaryDark : classes.colorSecondaryLight}} 
                                color={navMode === 0 ? "secondary" : "inherit"} 
                            />} 
                />
                <BottomNavigationAction 
                    classes={{selected: classes.selected}} 
                    label="By User" 
                    icon={ <PeopleAltRoundedIcon 
                                classes={{colorSecondary: darkMode ? classes.colorSecondaryDark : classes.colorSecondaryLight}} 
                                color={navMode === 1 ? "secondary" : "inherit"} 
                            />} 
                />
                <BottomNavigationAction 
                    classes={{selected: classes.selected}} 
                    label="Bookmarked" 
                    icon={ <BookmarksRoundedIcon 
                                classes={{colorSecondary: darkMode ? classes.colorSecondaryDark : classes.colorSecondaryLight}} 
                                color={navMode === 2 ? "secondary" : "inherit"} 
                            />} 
                />
            </BottomNavigation>
        </Paper>
    );

};