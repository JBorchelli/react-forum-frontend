import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { selectUserColor } from '../../../redux/slices/usersSlice';
import { discussionIsBookmarked, bookmarkAdded, bookmarkRemoved } from '../../../redux/slices/discussionsSlice';
import {useDispatch, useSelector} from 'react-redux';
import FavoriteRoundedIcon from '@material-ui/icons/FavoriteRounded';
import AddCommentRoundedIcon from '@material-ui/icons/AddCommentRounded';
import PostList from '../posts/PostList';
import BookmarkRoundedIcon from '@material-ui/icons/BookmarkRounded';
import dnd from '../../../fake_api/conanIcon.jpg';
import necrons from '../../../fake_api/necrons.jpg';
import PostEditor from '../posts/PostEditor';

const datePlaceholder = new Date(2021, 1, 16, 3, 44, 30);

const useStyles = makeStyles((theme) => ({
  root: {
    
  },
  disContainer: {
    flexShrink: 0,
    //flexGrow: 0,
    flexBasis: 'auto',
    width: '98%',
    marginBottom: theme.spacing(3),
    overflowY: 'auto',
    overflowX: 'visible',
    scrollBehavior: 'smooth',
    '&::-webkit-scrollbar': {
      width: theme.spacing(1)
    },
    '&::-webkit-scrollbar-track': {
      boxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)',
      webkitBoxShadow: 'inset 0 0 6px rgba(0,0,0,0.00)'
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.primary.main,
      borderRadius: '10px',
      //outline: '1px solid slategrey'
    },
    //minHeight: '100px',
    //maxHeight: '800px',
    //height: 'fitt-content'
  },
  media: {
    height: 'auto',
    width: '100%',
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  reaction: {

  },
  liked: {
    color: theme.palette.primary.main
  },
  comment: {

  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  collapse: {
    marginLeft: 'auto',
    transform: 'rotate(180deg)',
    color: theme.palette.primary.main
  },
  bookmarked: {
    color: theme.palette.primary.main
  }
}));

export default function Discussion(props) {
  
  const classes = useStyles();
  const dispatch = useDispatch();
  //const user = useSelector(state => selectUserById(state, props.discussion.user.id));
  const isBookmarked = useSelector(state => discussionIsBookmarked(state, props.discussion.id));
  const userColor = useSelector(state => selectUserColor(state, props.discussion.user.id));

  const [expanded, setExpanded] = useState(true);
  const [liked, setLiked] = useState(false);

  const media = () => {
    const img = props.discussion.id == 3 ? necrons : props.discussion.img;
    if(img){
      return <CardMedia className={classes.media} image={img} title={img} />;
    }
  };

  const handleLike = () => {
    setLiked(!liked);
  };

  const handleBookmark = () => {
    isBookmarked ? dispatch(bookmarkRemoved(props.discussion.id)) : dispatch(bookmarkAdded(props.discussion.id));
    //dispatch(bookmarkAdded(props.discussion.id));
  };

  const handleExpand = () => {
    setExpanded(!expanded);
  };

  return (
    <div className={classes.disContainer}>
      <Card className={classes.root}>
        <CardHeader
          avatar={
            <Avatar aria-label="user-avatar" 
                    className={classes.avatar} 
                    src={props.discussion.user ? (props.discussion.user.id == 1 ? dnd : props.discussion.user.avatarImg) : ""}
                    style={{backgroundColor: userColor ? userColor.main : "#333333", color: userColor ? userColor.contrast : "#ffffff"}}>
              {props.discussion.user ? props.discussion.user.username[0] : ""}
            </Avatar>
          }
          action={
            <>
              <IconButton aria-label="bookmark" className={isBookmarked ? classes.bookmarked : ""} onClick={handleBookmark}>
                <BookmarkRoundedIcon />
              </IconButton>
              <IconButton aria-label="settings">
                <MoreVertIcon />
              </IconButton>
            </>
          }
          title={props.discussion.user ? props.discussion.user.username : ""}
          subheader={/*props.discussion.timestamp ? props.discussion.timestamp.toDateString()*/ "January 1, 2021"}
        />
        {media()}
        <CardContent>
          <Typography>{props.discussion.title}</Typography>
        </CardContent>
        <CardActions disableSpacing>
          <IconButton className={liked ? classes.liked : classes.reaction} aria-label="reaction" onClick={handleLike}>
              <FavoriteRoundedIcon />
          </IconButton>
          <IconButton className={classes.comment} aria-label="comment">
              <AddCommentRoundedIcon />
          </IconButton>
          <IconButton className={expanded ? classes.collapse : classes.expand} aria-label="expand" onClick={handleExpand}>
              <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <PostList discussionId={props.discussion.id} expanded={expanded}></PostList>
        <PostEditor discussionId={props.discussion.id}></PostEditor>
      </Card>
      
    </div>
  );
}
