import {React, useImperativeHandle, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import getRandomColor from '../../util/getRandomColor';
import getMUIColor from '../../util/getMUIColor';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { categorySelected, setShowAllCategories } from '../../redux/slices/categoriesSlice';

const avatarColor = getMUIColor("bluegrey");
const highlightColor = getMUIColor("lightblue");
//alert(avatarColor.contrast);
const random = getRandomColor();

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    cursor: "pointer",
  },
  fallback: {
    color: avatarColor.contrast,
    backgroundColor: avatarColor.main,
    transition: theme.transitions.create('border-radius', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    //borderRadius: 20,
  },
  categoryTitle: {
    paddingBlock: 7,
  },
  selectedBox: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    boxShadow: '-10px 0 10px -9px inset #4fc3f7',
    borderRight: '1px double #4fc3f7',
    cursor: "pointer",
  },
  hoverBox: {
    display: 'flex',
    '& > *': {
      margin: theme.spacing(1),
    },
    cursor: "pointer",
  },
  hoverTooltip: {
    display: 'none',
  },
  hoverAvatar: {
    color: highlightColor.contrast,
    backgroundColor: highlightColor.main,
    transition: theme.transitions.create('border-radius', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    borderRadius: 8,
  }
}));

export default function CategoryItem(props) {
  const classes = useStyles();

  const [hover, setHover] = useState(false);

  const dispatch = useDispatch();

  const drawerOpen = useSelector(state => state.forum.categoryDrawerOpen);
  const selected = useSelector(state => state.categories.selectedCategory);

  const handleClick = () => {
    dispatch(categorySelected(props.category.id));
    dispatch(setShowAllCategories(false));
  };

  const hoverEnter = () => {
    setHover(true);
  };

  const hoverExit = () => {
    setHover(false);
  };

  const drawerClosedCategory = 
    <Tooltip title={props.category.name} placement="right">
        <Badge
          overlap="circle"
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          variant="dot"
          badgeContent=" "
          color="error"
        >
          <Avatar alt={props.category.name} src={props.category.img} className={hover ? classes.hoverAvatar : classes.fallback}>
            {props.category.name[0]}
          </Avatar>
          
        </Badge>
      </Tooltip>;

  const drawerOpenCategory =
      <Badge
        overlap="circle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
        badgeContent=" "
        color="error"
        >
        <Avatar alt={props.category.name} src={props.category.img} className={hover ? classes.hoverAvatar : classes.fallback}>
          {props.category.name[0]}
        </Avatar>
          
      </Badge>;

  return (
    <div className={selected === props.category.id ? classes.selectedBox : classes.root} onMouseEnter={hoverEnter} onMouseLeave={hoverExit} onClick={handleClick}>
      {drawerOpen ? drawerOpenCategory : drawerClosedCategory}
      <Typography variant="subtitle1" className={classes.categoryTitle}>
            {props.category.name}
      </Typography>   
    </div>
  );
}