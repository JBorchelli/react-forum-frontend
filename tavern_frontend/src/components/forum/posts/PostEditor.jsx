import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { createNewPost } from '../../../redux/slices/postsSlice';
import { selectCurrentUser } from '../../../redux/slices/usersSlice';
import {useDispatch, useSelector} from 'react-redux';
import Button from '@material-ui/core/Button';
import AddCommentIcon from '@material-ui/icons/AddComment';
import InsertPhotoRoundedIcon from '@material-ui/icons/InsertPhotoRounded';
import GifRoundedIcon from '@material-ui/icons/GifRounded';
import EmojiEmotionsRoundedIcon from '@material-ui/icons/EmojiEmotionsRounded';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    backgroundColor: theme.palette.background.main,
    flexBasis: 'auto',
    width: '95%',
    marginBottom: theme.spacing(2),
    overflow: 'hidden',
    height: theme.spacing(5),
    margin: theme.spacing(2),
    borderRadius: '8px',
    
  },
    addPostIconBox: {
        height: '100%',
        flexGrow: 0.2,
        borderRight: '2px solid #212121',
        backgroundColor: theme.palette.background.main
    },
    addPostIcon: {
        height: '100%',
        width: '100%',
        padding: '8px',
        color: theme.palette.background.contrastText
    },
    textInputBox: {
        height: 'fit-content',
        flexGrow: 10,
        backgroundColor: theme.palette.background.light,
    },
    textInput: {
        height: '30%',
    },
    buttonBox: {
        height: '100%',
        maxWidth: theme.spacing(8),
        flexGrow: 0.1,
        justifyContent: 'center',
        borderRadius: '1px'
    },
    imageButton: {
        height: theme.spacing(5),
        borderRadius: '1px',
        color: theme.palette.background.contrastText,
        '&:hover': {
            backgroundColor: theme.palette.background.light
        }
    },
    gifButton: {
        height: theme.spacing(5),
        color: theme.palette.background.contrastText,
        borderRadius: '1px',
        '&:hover': {
            backgroundColor: theme.palette.background.light
        }
    },
    emoticonButton: {
        height: theme.spacing(5),
        color: theme.palette.background.contrastText,
        borderRadius: '1px',
        '&:hover': {
            backgroundColor: theme.palette.background.light
        }
    }
}));

export default function PostEditor(props) {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  const currentUser = useSelector(selectCurrentUser);

  const handleSubmit = async (event) => {
    const messageText = event.target.value;
    if(!event.shiftKey && event.key === "Enter" && messageText && messageText.length > 0){
        event.preventDefault();
        try{
            await dispatch(createNewPost({message: messageText, discId: props.discussionId, userId: currentUser.id}));
        } catch (error) {
            console.log(error);
        } finally {
            event.target.value = "";
        }
        
    }
  };

  return (
      <div className={classes.root}>
          <div className={classes.addPostIconBox} >
              <AddCommentIcon className={classes.addPostIcon}></AddCommentIcon>
          </div>
          <div className={classes.textInputBox} >
            <TextField
                className={classes.textInput}
                id="outlined-textarea"
                label=""
                placeholder=""
                multiline
                fullWidth
                size="small"
                variant="outlined" 
                onKeyDown={event => handleSubmit(event)}
            />
          </div>
          <div className={classes.buttonBox}>
            <Button aria-label="insert an image" className={classes.imageButton}>
                <InsertPhotoRoundedIcon />
            </Button>
          </div>
          <div className={classes.buttonBox}>
            <Button aria-label="insert an image" className={classes.gifButton}>
                <GifRoundedIcon />
            </Button>
          </div>
          <div className={classes.buttonBox}>
            <Button aria-label="insert an image" className={classes.emoticonButton}>
                <EmojiEmotionsRoundedIcon />
            </Button>
          </div>
      </div>
  );
}