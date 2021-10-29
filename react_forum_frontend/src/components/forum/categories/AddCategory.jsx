import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, Tooltip } from '@material-ui/core';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import AddCategoryModal from './AddCategoryModal';
import Zoom from '@material-ui/core/Zoom';


const useStyles = makeStyles((theme) => ({
    root: {
        width: theme.spacing(8),
        height: theme.spacing(8),
        backgroundColor: theme.palette.background.paper,
        opacity: 0.85,
        marginLeft: 'auto',
        marginTop: theme.spacing(2),
        cursor: 'pointer',
        

    },
    hoverBox: {
        width: '100%',
        height: '100%',
        borderRadius: '4px',
        '&:hover': {
            backgroundColor: theme.palette.action.hover
        }

    },
    addIcon: {
        width: '2em',
        height: '2em',
        margin: theme.spacing(1)
    },
    
}));

export default function AddCategory() {

    const classes = useStyles();

    const [categoryModal, setCategoryModal] = useState(false);
	
    const handleClickOpen = () => {
	    setCategoryModal(true);
    }

    const handleClose = () => {
	    setCategoryModal(false);
    }

    return(
        <Paper elevation={3} className={classes.root} >
            <Tooltip title="New Category" aria-label="new category" TransitionComponent={Zoom}>
                <div className={classes.hoverBox} onClick={handleClickOpen}>
                    <AddCircleOutlineOutlinedIcon className={classes.addIcon}></AddCircleOutlineOutlinedIcon>
                </div>
            </Tooltip>
            <AddCategoryModal open={categoryModal} handleClose={handleClose}></AddCategoryModal>
        </Paper>
        
    );

}
