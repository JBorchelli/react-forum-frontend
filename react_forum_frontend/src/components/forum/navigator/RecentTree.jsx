import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import TreeItem from './TreeItem';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Collapse from '@material-ui/core/Collapse';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import { RECENT_TIME_LENGTH } from '../../../util/constants';
import { sortByTimeStamp } from '../../../util/sorts';
import { recentToggled, weekToggled, twoWeekToggled, monthToggled, allToggled } from '../../../redux/slices/forumSlice';

const recentDate = new Date();
recentDate.setDate(recentDate.getDate() - RECENT_TIME_LENGTH);

const weekDate = new Date();
weekDate.setDate(weekDate.getDate() - 7);

const twoWeekDate = new Date();
twoWeekDate.setDate(twoWeekDate.getDate() - 14);

const monthDate = new Date();
monthDate.setDate(monthDate.getDate() - 30);

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        flexGrow: 9,
        margin: '0 auto',
    },
    nested: {
        paddingLeft: theme.spacing(4),
      },
}));

export default function RecentTree(props) {

    const dispatch = useDispatch();
    const recentOpen = useSelector(state => state.forum.recent);
    const weekOpen = useSelector(state => state.forum.week);
    const twoWeekOpen = useSelector(state => state.forum.twoWeek);
    const monthOpen = useSelector(state => state.forum.month);
    const allOpen = useSelector(state => state.forum.all);

    const classes = useStyles();

    const handleClick = {
        'recent': () => {dispatch(recentToggled())},
        'week': () => {dispatch(weekToggled())},
        'twoWeek': () => {dispatch(twoWeekToggled())},
        'month': () => {dispatch(monthToggled())},
        'all': () => {dispatch(allToggled())},
    }

    const prepareItems = (date) => {
        return props.discussions.filter((discussion) => {
                                    return discussion.timestamp > date;
                              }).sort(
                                    sortByTimeStamp
                               ).map((discussion) => {
                                    return <TreeItem discussion={discussion}></TreeItem>;
                              });
    };

    const allItems = () => {
        return props.discussions.sort(sortByTimeStamp).map((discussion) => {return <TreeItem discussion={discussion}></TreeItem>})
    };

    return (
        <>
            <ListItem button onClick={handleClick['recent']}>
                <ListItemIcon>
                    <DateRangeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Recent Activity" />
                    {recentOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={recentOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {prepareItems(recentDate)}
                </List> 
            </Collapse>
            <ListItem button onClick={handleClick['week']}>
                <ListItemIcon>
                    <DateRangeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Last Week" />
                    {weekOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={weekOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {prepareItems(weekDate)}
                </List> 
            </Collapse>
            <ListItem button onClick={handleClick['twoWeek']}>
                <ListItemIcon>
                    <DateRangeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Two Weeks" />
                    {twoWeekOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={twoWeekOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {prepareItems(twoWeekDate)}
                </List> 
            </Collapse>
            <ListItem button onClick={handleClick['month']}>
                <ListItemIcon>
                    <DateRangeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="Month" />
                    {monthOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={monthOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {prepareItems(monthDate)}
                </List> 
            </Collapse>
            <ListItem button onClick={handleClick['all']}>
                <ListItemIcon>
                    <DateRangeRoundedIcon />
                </ListItemIcon>
                <ListItemText primary="All" />
                    {allOpen ? <ExpandLess /> : <ExpandMore />}
            </ListItem>
            <Collapse in={allOpen} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                    {allItems()}
                </List> 
            </Collapse>
        </>
            
            
       
    );

};
