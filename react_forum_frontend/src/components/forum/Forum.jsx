import React, { useEffect } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { selectShowAllCategories } from '../../redux/slices/categoriesSlice';
import { fetchPartyById } from '../../redux/slices/partiesSlice';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import "./Forum.modules.scss";
import CategoryBar from './categories/CategoryBar';
import DiscussionFeed from './discussions/DiscussionFeed';
import AllCategories from './categories/AllCategories';
import Users from './users/Users';
import FeedNavigator from './navigator/FeedNavigator';
import CurrentUser from './users/CurrentUser';
import AllCategoriesBox from './categories/AllCategoriesBox';
import AddCategory from './categories/AddCategory';
import AddDiscussionControl from './discussions/AddDiscussionControl';
 
//import { categorySelected } from '../../redux/slices/categoriesSlice';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    overflowX: 'visible',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
    overflowX: 'visible',
    //height: '10vh'
  },
}));

export default function Forum() {

  const darkMode = useSelector(state => state.preferences.darkMode);
  const partyLoading = useSelector(state => state.parties.loading);
  const selectedParty = useSelector(state => state.parties.selectedParty);
  const classes = useStyles();
  const allCategoriesSelected = useSelector(state => selectShowAllCategories(state));
  
  //const selectedCategory = useSelector(state => state.forum.selectedCategory);

  const dispatch = useDispatch();

  useEffect( async () => {
    try{
      await dispatch(fetchPartyById(selectedParty))
    } catch (error) {
      console.log(error)
    }
  }, []);

  return (
    <div className="forum-window">
      <div className={classes.root}>
        <Grid container spacing={1}>
          <Grid item xs={12}>
            <div className="cell-1"></div>
          </Grid>
          <Grid item xs={1}>
            <div className="cell-2">
              <AddCategory></AddCategory>
            </div>
          </Grid>
          <Grid item xs={8}>
            <div className="cell-3">
              <CategoryBar></CategoryBar>
            </div>
          </Grid>
          <Grid item xs={1}>
            <div className="cell-4">
              <AllCategories></AllCategories>
            </div>
          </Grid>
          <Grid item xs={2}>
            <div className="cell-5">
              <CurrentUser></CurrentUser>
            </div>
          </Grid>
          <Grid item xs={10}>
            <div className="cell-6-1"></div>
          </Grid>
          <Grid item xs={2}>
            <div className="cell-6-2">
              
            </div>
          </Grid>
          <Grid item xs={3}>
            <div className="cell-7">
              <FeedNavigator></FeedNavigator>
            </div>
          </Grid>
          <Grid item xs={7}>
            <div className="cell-8">
              {!allCategoriesSelected ? <AddDiscussionControl></AddDiscussionControl> : null}
              {allCategoriesSelected ? <AllCategoriesBox></AllCategoriesBox> : <DiscussionFeed></DiscussionFeed>}
            </div>
          </Grid>
          <Grid item xs={2}>
            <div className="cell-9">
              <Users></Users>
            </div>
          </Grid>
          <Grid item xs={12}>
            <div className="cell-10"></div>
          </Grid>
        </Grid>
      </div> 
    </div>
    
  );
}