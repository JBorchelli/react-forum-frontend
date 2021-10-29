import {React, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import { categorySelected, setShowAllCategories } from '../../../redux/slices/categoriesSlice';
import Zoom from '@material-ui/core/Zoom';
import getMUIColor from '../../../util/getMUIColor';
import dnd from '../../../fake_api/dnd.png';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import SettingsRoundedIcon from '@material-ui/icons/SettingsRounded';
import IconButton from '@material-ui/core/IconButton';
import VolumeUpRoundedIcon from '@material-ui/icons/VolumeUpRounded';
import VolumeOffRoundedIcon from '@material-ui/icons/VolumeOffRounded';

const avatarColor = getMUIColor("bluegrey");

const useStyles = makeStyles((theme) => ({
  root: { 
    
    //backgroundColor: theme.palette.primary.light,
    //width: theme.spacing(16),
    //height: theme.spacing(16),
    maxWidth: theme.spacing(32),
    flex: '0 1 auto',
    marginLeft: theme.spacing(4), 
    marginBottom: theme.spacing(4),
  },
  actionArea: {
    cursor: "pointer",
  },
  muteIcon: {
    marginLeft: theme.spacing(21)
  },
  settingsIcon: {
    
  },
  categoryAvatar: {
    //width: '80%',
    minWidth: theme.spacing(24),
    //height: '80%',
    minHeight: theme.spacing(14),
    marginTop: theme.spacing(4),
    marginLeft: theme.spacing(4),
    //minHeight: theme.spacing(12),
    fontSize: '24pt'
  }

}));

export default function AllCategoriesItem(props) {
  const classes = useStyles();

  //const [hover, setHover] = useState(false);
  const [color, setColor] = useState({main: '#747474', contrast: '#ffffff'});
  const [muted, setMuted] = useState(false);


  const dispatch = useDispatch();

  const handleClick = () => {
    dispatch(categorySelected(props.category.id));
    dispatch(setShowAllCategories(false));
  };

  const handleMute = () => {
    setMuted(true);
  };

  const handleUnMute = () => {
    setMuted(false);
  };


  const categoryAvatar =
      <Badge
        overlap="rectangle"
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        //variant="dot"
        badgeContent={muted ? 0 : Math.floor(Math.random() * 10)} //Random int from 0-9 for example purposes
        color="error"
        >
        <Avatar variant="rounded" 
            alt={props.category.name} 
            src={props.category.name == '5e' ? dnd : props.category.img} 
            className={classes.categoryAvatar} 
            style={{backgroundColor: color.main, color: color.contrast}}
        >
          {props.category.name[0]}
        </Avatar>
          
      </Badge>;

  const muteIcon = muted ? <VolumeOffRoundedIcon color="error" ></VolumeOffRoundedIcon> : <VolumeUpRoundedIcon ></VolumeUpRoundedIcon>;

  useEffect(() => {
    setColor(props.random);
  }, []);

  return (
    <Card elevation={5} className={classes.root} >
      <CardActionArea className={classes.actionArea} onClick={handleClick}>
        {categoryAvatar}
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.category.name}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            This space can be used for category descriptions! \(^o^)/
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
      <Tooltip TransitionComponent={Zoom} enterDelay={200} title={muted ? "Unmute" : "Mute"} arrow>
        <IconButton size="small" className={classes.muteIcon} onClick={muted ? handleUnMute : handleMute}>
          {muteIcon}
        </IconButton>
        </Tooltip>
        <Tooltip TransitionComponent={Zoom} enterDelay={200} title="Settings" arrow>
        <IconButton size="small" className={classes.settingsIcon}>
          <SettingsRoundedIcon></SettingsRoundedIcon>
        </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}