import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tooltip } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import Zoom from '@material-ui/core/Zoom';
import AddDiscussionModal from './AddDiscussionModal';

const useStyles = makeStyles((theme) => ({
  root: {
    position: 'absolute',
    top: theme.spacing(1),
    right: '91%',
    height: theme.spacing(7),
    width: theme.spacing(7),
    cursor: 'pointer'
    
  },
  hoverBox: {
    '&:hover': {
      backgroundColor: theme.palette.action.hover
    },
  },

  label: {
      //marginLeft: '30%',
      paddingTop: theme.spacing(1)
  },
  addIcon: {
      height: '80%',
      width: '80%',
      marginLeft: '10%',
      marginTop: '9%', 
  }
}));

export default function AddDiscussionControl() {
  
  const classes = useStyles();

  const [discussionModal, setDiscussionModal] = useState(false);
	
  const handleClickOpen = () => {
	    setDiscussionModal(true);
  }

  const handleClose = () => {
	  setDiscussionModal(false);
  }

  return (
    <Paper elevation={3} className={classes.root} >
        <Tooltip title="New Discussion" aria-label="new discussion" TransitionComponent={Zoom}>
          <div className={classes.hoverBox} onClick={handleClickOpen}>
              <AddCircleOutlineOutlinedIcon className={classes.addIcon}></AddCircleOutlineOutlinedIcon>
          </div>
        </Tooltip>
      <AddDiscussionModal open={discussionModal} handleClose={handleClose}></AddDiscussionModal>
    </Paper>
  );
}