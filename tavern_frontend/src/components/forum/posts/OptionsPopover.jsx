import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
    root: {  
      
    },
    options: {
        position: 'absolute',
        display: 'flex',
        top: -20,
        right: -15,
        opacity: 1,
        width: "auto",
        height: theme.spacing(4),
        backgroundColor: theme.palette.primary.dark,
        transition: 'all .2s 0.3s ease-in',
        //border: '1px solid #444444',
        //opacity: 1,
        overflow: 'none'
        
      },
      optionsHidden: {
        position: 'absolute',
        display: 'flex',
        top: -30,
        right: -15,
        width: theme.spacing(24),
        height: theme.spacing(4),
        backgroundColor: theme.palette.primary.main,
        opacity: 0,
      },
      optionButton: {
        flexGrow: 1,
        //flexShrink: 1,
        //flexBasis: theme.spacing(1),
        color: theme.palette.primary.contrastText,
        overflow: 'none',
        '&:hover': {
          backgroundColor: theme.palette.primary.light
        }
        //opacity: 0
      }
  }));

export default function OptionsPopover(props) {

    const classes = useStyles();

    return (
        <Paper elevation={props.popoverHovered ? 3 : 3} 
               className={props.postHovered ? classes.options : classes.optionsHidden} 
               onMouseEnter={props.hoverInPopover} 
               onMouseLeave={props.hoverOutPopover}
        >
            <Button className={classes.optionButton} aria-label="reaction" >
              <FavoriteRoundedIcon />
            </Button>
            <Button className={classes.optionButton} aria-label="comment">
              <AddCommentRoundedIcon />
            </Button>
            <Button className={classes.optionButton} aria-label="comment">
              <MoreVertIcon/>
            </Button>
          </Paper>
    );
}
