import {forwardRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import InsertPhotoRoundedIcon from '@material-ui/icons/InsertPhotoRounded';
import GifRoundedIcon from '@material-ui/icons/GifRounded';
import EmojiEmotionsRoundedIcon from '@material-ui/icons/EmojiEmotionsRounded';
import Slide from '@material-ui/core/Slide';
import { useSelector, useDispatch } from 'react-redux';
import { createNewDiscussion } from '../../../redux/slices/discussionsSlice';
import { selectCurrentCategory } from '../../../redux/slices/categoriesSlice';
import { selectCurrentUser } from '../../../redux/slices/usersSlice';

const useStyles = makeStyles((theme) => ({
    root: {
        //backgroundColor: theme.palette.background.dark
    },
    title: {
      backgroundColor: theme.palette.background.paper
    },
    content: {
      backgroundColor: theme.palette.background.paper
    },
    actions: {
      backgroundColor: theme.palette.background.paper
    },
    messageField: {
      width: theme.spacing(60),
      //backgroundColor: theme.palette.background.dark,
      '& label.Mui-focused': {
        color: theme.palette.primary.main
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: theme.palette.primary.main,
      },
    },
    titleField: {
      
      '& label.Mui-focused': {
        color: theme.palette.primary.main
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: theme.palette.primary.main,
      },
    },
    cancelButton: {
      color: theme.palette.background.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
      
    },
    addButton: {
      color: theme.palette.background.contrastText,
      '&:hover': {
        backgroundColor: theme.palette.action.hover
      }
    },
    buttonBar: {
      position: 'relative',
      width: '100%',
      height: theme.spacing(5),
      backgroundColor: theme.palette.background.main,
      display: 'flex',
    },
    buttons: {
      position: 'absolute',
      right: 0,
      height: theme.spacing(5),
      justifyContent: 'right',
    },
    button: {
      width: theme.spacing(7),
      height: '100%',
      borderRadius: '1px',
      '&:hover': {
        backgroundColor: theme.palette.background.light
      }
    }


}));
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddDiscussionModal(props) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const categoryId = useSelector(state => selectCurrentCategory(state));
  const currentUser = useSelector(state => selectCurrentUser(state)); 
   
  const [discussionTitle, setDiscussionTitle] = useState(""); 
  const [discussionMessage, setDiscussionMessage] = useState(""); 

  const submitNewDiscussion = async () => {

    if(discussionTitle && discussionTitle.length > 0) {
      try{
        await dispatch(createNewDiscussion({title: discussionTitle, message: discussionMessage, categoryId: categoryId, userId: currentUser.id}));
      } catch(error) {
        console.log(error);
        alert("There was an error creating new discussion.");
      } finally {
        props.handleClose();
      }
    }

  }

  const handleTitleChange = (event) => {
    setDiscussionTitle(event.target.value);
  }

  const handleMessageChange = (event) => {
    setDiscussionMessage(event.target.value);
  }

  return (
    <div>
      
      <Dialog open={props.open}
              className={classes.root}
              TransitionComponent={Transition} 
              onClose={props.handleClose} 
              maxWidth='md'
              aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.title} id="form-dialog-title">Add New Discussion</DialogTitle>
        <DialogContent className={classes.content} 
        //style={{backgroundColor: darkMode ? theme.palette.background.dark : theme.palette.background.paper}}
        >
          <TextField
            className={classes.titleField}
            autoFocus
            margin="dense"
            id="name"
            label="Discussion Title"
            type="name"
            variant="standard"
            onChange={event => handleTitleChange(event)}
            fullWidth
          />
        </DialogContent>
        
        <DialogContent className={classes.content}>
          <TextField
            className={classes.messageField}
            //margin="dense"
            id="name"
            label="Discuss something..."
            type="name"
            variant="filled"
            onChange={event => handleMessageChange(event)}
            fullWidth
            multiline
            rows='10'
          />
          <Paper className={classes.buttonBar}>
            <ButtonGroup className={classes.buttons}>
              <Button aria-label="insert an image" className={classes.button} variant="text">
                    <InsertPhotoRoundedIcon />
                </Button>
                <Button aria-label="insert an image" className={classes.button} variant="text">
                    <GifRoundedIcon />
                </Button>
                <Button aria-label="insert an image" className={classes.button} variant="text">
                    <EmojiEmotionsRoundedIcon />
                </Button>
            </ButtonGroup>
          </Paper>
        </DialogContent>
        <DialogActions className={classes.actions}>
          <Button className={classes.cancelButton} onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button className={classes.addButton} onClick={submitNewDiscussion} color="primary">
            Add
          </Button>
        </DialogActions>

      </Dialog>
    </div>
  );
}