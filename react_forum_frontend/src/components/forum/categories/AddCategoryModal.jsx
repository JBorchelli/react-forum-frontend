import {forwardRef, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import { useSelector, useDispatch } from 'react-redux';
import { createNewCategory } from '../../../redux/slices/categoriesSlice';
import { getCurrentPartyId } from '../../../redux/slices/partiesSlice';

const useStyles = makeStyles((theme) => ({
    title: {
      backgroundColor: theme.palette.background.paper
    },
    content: {
      backgroundColor: theme.palette.background.paper
    },
    field: {
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

}));
const Transition = forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function AddCategoryModal(props) {

  const classes = useStyles();
  const dispatch = useDispatch();

  const [categoryTitle, setCategoryTitle] = useState(""); 

  const partyId = useSelector(state => getCurrentPartyId(state));

  const submitNewCategory = async () => {

    if(categoryTitle && categoryTitle.length > 0) {
      try{
        await dispatch(createNewCategory({name: categoryTitle, partyId: partyId}));
      } catch(error) {
        console.log(error);
        alert("There was an error creating new category.");
      } finally {
        props.handleClose();
      }
    }

  }

  const handleChange = (event) => {
    setCategoryTitle(event.target.value);
  }

  return (
    <div>
      
      <Dialog open={props.open}
              TransitionComponent={Transition} 
              onClose={props.handleClose} 
              aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.title} 
                     id="form-dialog-title"
                     //style={{backgroundColor: darkMode ? theme.palette.background.dark : theme.palette.background.paper}}
        >
            Add New Category
        </DialogTitle>
        <DialogContent className={classes.content} 
        //style={{backgroundColor: darkMode ? theme.palette.background.dark : theme.palette.background.paper}}
        >
          <TextField
            className={classes.field}
            autoFocus
            margin="dense"
            id="name"
            label="Category Title"
            type="name"
            variant="standard"
            onChange={event => handleChange(event)}
            fullWidth
          />
        </DialogContent>
        <DialogActions //style={{backgroundColor: darkMode ? theme.palette.background.dark : theme.palette.background.paper}}
        >
          <Button className={classes.cancelButton} onClick={props.handleClose} color="primary">
            Cancel
          </Button>
          <Button className={classes.addButton} onClick={submitNewCategory} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}