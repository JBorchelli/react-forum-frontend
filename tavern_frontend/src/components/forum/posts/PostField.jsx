import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '30%',
  }
}));

export default function PostField(props) {
  
  const classes = useStyles();

  const [messageText, setMessageText] = useState("");

  return (
      
    <TextField
        className={classes.textInput}
        id="outlined-textarea"
        label=""
        placeholder=""
        multiline
        fullWidth
        size="small"
        variant="outlined" 
        onChange={event => setMessageText(event.target.value)}
        onKeyDown={event => props.handleSubmit(event, messageText)}
    />
         
  );
}