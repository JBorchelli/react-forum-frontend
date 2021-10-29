import React, {useState} from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import CardMedia from '@material-ui/core/CardMedia';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import { selectUserColor } from '../../../redux/slices/usersSlice';
import { useSelector } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import OptionsPopover from './OptionsPopover';
import bloodbowl from '../../../fake_api/bloodbowl.jpg';
import dnd from '../../../fake_api/conanIcon.jpg';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexShrink: 0,
    flexBasis: 'auto',
    width: '95%',
    marginBottom: theme.spacing(2),
    overflowY: 'none',
    overflowX: 'visible',
    minHeight: theme.spacing(5),
  },
  body: {
    position: 'relative',
    flexShrink: 0,
    flexBasis: 'auto',
    width: '85%',
    marginBottom: theme.spacing(3),
    overflowY: 'none',
    overflowX: 'visible',
    minHeight: theme.spacing(5),
    backgroundColor: theme.palette.background.light,
    borderRadius: '6px',
    marginRight: theme.spacing(3)
  },
  media: {
    height: 'auto',
    width: '100%',
    paddingTop: '56.25%', // 16:9
  },
  avatarBox: {
    textAlign: 'center',
    overflowX: 'none',
    wordWrap: 'break-word',
    paddingRight: theme.spacing(1),
    width: theme.spacing(12),
  },
  avatar: {
    margin: '0 auto',
    marginBottom: '2px',
    cursor: 'pointer'
  },
  options: {
    position: 'absolute',
    display: 'flex',
    top: -20,
    right: -15,
    width: "auto",
    height: theme.spacing(4),
    backgroundColor: theme.palette.background.main,
    transition: 'all .3s ease-out',
    opacity: 1,
    overflow: 'none'
    
  },
  optionsHidden: {
    position: 'absolute',
    display: 'flex',
    top: -20,
    right: -15,
    width: theme.spacing(0),
    height: theme.spacing(0),
    backgroundColor: theme.palette.background.main,
    opacity: 0,
  },
  optionButton: {
    flexGrow: 1,
    flexShrink: 0,
    overflow: 'none'
  },
  liked: {
    color: theme.palette.primary.light
  },
  comment: {
    margin: theme.spacing(1)
  },
  userName: {
    margin: '0 auto',
    cursor: 'pointer',
    width: '100%',
    '&:hover': {
      textDecoration: 'underline',
      color: theme.palette.primary.light
    }
  },
  popover: {
    backgroundColor: theme.palette.background.main
  }
}));

export default function Post(props) {
  
  const classes = useStyles();
  const theme = useTheme();
  
  const darkMode = useSelector(state => state.preferences.darkMode);
  const userColor = useSelector(state => selectUserColor(state, props.post.user.id));

  const [popoverHovered, setPopoverHovered] = useState(false);
  const [postHovered, setPostHovered] = useState(false);

  const media = () => {
    const img = props.post.id == 5 ? bloodbowl : props.post.img;
    if(img){
      return <CardMedia className={classes.media} image={img} title={img} />;
    }
  };

  const hoverInPopover = () => {
    setPopoverHovered(true);
  };

  const hoverOutPopover = () => {
    setPopoverHovered(false); 
  };

  const hoverInPost = () => {
    setPostHovered(true);
  };

  const hoverOutPost = () => {
    setPostHovered(false); 
  };

  return (
      <div className={classes.root}  >
        <div className={classes.avatarBox} >
          <Avatar aria-label="user-avatar" 
                  className={classes.avatar} 
                  src={props.post.user ? (props.post.user.id == 1 ? dnd : props.post.user.avatarImg) : ""  }
                  style={{backgroundColor: userColor ? userColor.main : "#333333", color: userColor ? userColor.contrast : "#ffffff"}}>
            {props.post.user ? props.post.user.username[0] : ""}
          </Avatar>
          <Typography className={classes.userName} variant="body2">{props.post.user ? props.post.user.username : ""}</Typography>
        </div>
        <Paper className={classes.body} onMouseEnter={hoverInPost} onMouseLeave={hoverOutPost}>
          
          <Typography className={classes.comment} >{props.post.message}</Typography>
          <OptionsPopover 
            hoverInPopover={hoverInPopover} 
            hoverOutPopover={hoverOutPopover}
            postHovered={postHovered}
            popoverHovered={popoverHovered}
          ></OptionsPopover>
          {media()}
        </Paper>
        
      </div>
  );
}