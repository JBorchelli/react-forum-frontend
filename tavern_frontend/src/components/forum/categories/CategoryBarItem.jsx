import {React, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {useDispatch, useSelector} from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { categorySelected, setShowAllCategories } from '../../../redux/slices/categoriesSlice';
import Zoom from '@material-ui/core/Zoom';
import getMUIColor from '../../../util/getMUIColor';
import dnd from '../../../fake_api/dnd.png';

const avatarColor = getMUIColor("bluegrey");

const useStyles = makeStyles((theme) => ({
  root: {  
    '& > *': {
      cursor: "pointer"
    },
    
  },
  categoryBox: {
    position: 'relative',
    flexShrink: 0,
    width: theme.spacing(12),
    cursor: "pointer",
    backgroundColor: "#00000000",
    textAlign: 'center',
    paddingTop: theme.spacing(1),
    overflow: 'hidden'
  },
  fallback: {
    color: avatarColor.contrast,
    //backgroundColor: random.main,
    width: theme.spacing(9),
    height: theme.spacing(7),
    transition: theme.transitions.create('border-radius', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    
  },
  categoryTitle: {
    margin: '0 auto',
  },
  categoryTitleSelected: {
    margin: '0 auto',
    color: '#ffffff'
  },
  selectedBox: {
    position: 'relative',
    flexShrink: 0,
    width: theme.spacing(12),
    cursor: "pointer",
    backgroundColor: theme.palette.action.hover,
    textAlign: 'center',
    paddingTop: theme.spacing(1),
  },
  hoverBox: {
    '& > *': {
      //margin: theme.spacing(1),
    },
    cursor: "pointer",
    backgroundColor: theme.palette.primary.light,
  },
  hoverTooltip: {
    display: 'none',
  },
  hoverAvatar: {
    width: theme.spacing(9),
    height: theme.spacing(7),
    
    //color: theme.palette.text.primary,
    //backgroundColor: theme.palette.secondary.dark,
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  selectIndicator: {
    backgroundColor: theme.palette.primary.main,
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: "4px",
    borderRadius: "2px",
    //boxShadow: "0px 0px 5px 0px #439889",
    transition: theme.transitions.create('all', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.standard,
    })
  },
  hidden: {
    width: "0%",
    position: 'absolute',
    bottom: 0,
    left: "48px",
    height: "3px",
    borderRadius: "2px",
  }
}));

export default function CategoryItem(props) {
  const classes = useStyles();

  const [hover, setHover] = useState(false);
  const [color, setColor] = useState({main: '#747474', contrast: '#ffffff'});

  const dispatch = useDispatch();

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

  const getVariant = () => {
    if(props.category.name.length <= 10) {
      return "body1";
    } 
    else if(props.category.name.length <=13){
      return "body2";
    }
    else {
      return "caption";
    }
  };

  const categoryAvatar =
      <Badge
        overlap="rectangle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        variant="dot"
        badgeContent=" "
        color="error"
        >
        <Avatar variant="rounded" alt={props.category.name} src={props.category.name == '5e' ? dnd : props.category.img} className={hover ? classes.hoverAvatar : classes.fallback} style={{backgroundColor: color.main, color: color.contrast}}>
          {props.category.name[0]}
        </Avatar>
          
      </Badge>;

  useEffect(() => {
    setColor(props.random);
  }, []);

  return (
    
    <Tooltip TransitionComponent={Zoom} enterDelay={1000} title={props.category.name} arrow>
      <div className={selected === props.category.id || hover? classes.selectedBox : classes.categoryBox} onMouseEnter={hoverEnter} onMouseLeave={hoverExit} onClick={handleClick}>
        {categoryAvatar}  
        <Typography className={selected === props.category.id || hover? classes.categoryTitle : classes.categoryTitle} variant={getVariant()}>{props.category.name.substr(0, 15)}</Typography>
        <div className={selected === props.category.id ? classes.selectIndicator : classes.hidden} ></div>
      </div>
    </Tooltip>
  );
}
