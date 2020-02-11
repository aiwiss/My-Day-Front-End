import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AddIcon from '@material-ui/icons/Add';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom';
import ToolbarSpacer from '../../Layout/ToolbarSpacer';
import RssFeedIcon from '@material-ui/icons/RssFeed';
import PersonOutlineIcon from '@material-ui/icons/PersonOutline';
import ChatBubbleOutlineIcon from '@material-ui/icons/ChatBubbleOutline';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';
import history from '../../../misc/history';

const useStyles = makeStyles(theme => ({
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  logo: {
    color: 'orange'
  },
  appBarButton: {
    border: '1px solid white',
    marginLeft: '50px',
    marginRight: '50px',
    color: 'white'
  },
  icon: {
    marginRight: '10px'
  },
  addPostForm: {
    position: 'fixed'
  },
  drawerMenuText: {
    marginLeft: '15px'
  }
}));

const fullMenu = [
  { text: 'Alle Historier', path: '/' , icon: <RssFeedIcon/>, visibleTo: 'user'},
  { text: 'Min Profil', path: '/profile', icon: <PersonOutlineIcon/>, visibleTo: 'user' },
  { text: 'Meldingene Mine', path: '/messages', icon: <ChatBubbleOutlineIcon />, visibleTo: 'user' },
  { text: 'Historiene Mine', path: '/mystories', icon: <ImportContactsIcon />, visibleTo: 'user' },
  { text: 'Vis brukere', path: '/users', icon: <SupervisorAccountIcon />, visibleTo: 'admin' },
  { text: 'Logg Ut', path: '/logout', icon: <ExitToAppIcon />, visibleTo: 'user' },
];

const appBarMenu = {
  addStory: { text: 'Fortelle Historien', path: '/add-story' },
}

const Navbar = () => {
  const classes = useStyles();
  const user = useSelector(state => state.userState.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(history.location.pathname);

  useEffect(() => {
    if (selected !== history.location.pathname) 
      setSelected(history.location.pathname)
  }, [history.location.pathname]);

  const handeListItemClick = item => {
    setMenuOpen(!menuOpen);
    setSelected(item.path);
  };

  const hideMenu = () => setMenuOpen(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const drawerMenu = fullMenu.filter(item => item.visibleTo === 'admin' && user.role === 'admin' || item.visibleTo === 'user');

  return (
    user ?
    <div id="navbar">
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="menu" onClick={toggleMenu}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h5">
            <a className={classes.logo}><i>My</i></a>DayUB
          </Typography>
          <Button 
            variant="outlined" 
            className={classes.appBarButton} 
            onClick={hideMenu}
            component={Link} 
            to={{
              pathname: appBarMenu.addStory.path,
              state: { username: user.username }
            }}>
            <AddIcon className={classes.icon} />
            {appBarMenu.addStory.text}
            </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" open={menuOpen}>
        <ToolbarSpacer />
          <List>
            {drawerMenu.map((item, index) => (
              <ListItem button onClick={() => handeListItemClick(item)} key={index} component={Link} to={item.path} selected={selected === item.path}>
                { item.icon }
                <ListItemText className={classes.drawerMenuText} primary={item.text} />
              </ListItem> 
            ))}
          </List>
      </Drawer>
      <ToolbarSpacer />
    </div>
    : null
  )
}

export default Navbar;