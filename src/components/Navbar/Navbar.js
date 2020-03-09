import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import history from '../../misc/history';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, AppBar, Toolbar, Button, IconButton,
  Drawer, List, ListItem, ListItemText } from '@material-ui/core';
import { MenuIcon, AddIcon, RssFeedIcon, PersonOutlineIcon, 
  ChatBubbleOutlineIcon, ExitToAppIcon, ImportContactsIcon, 
  SupervisorAccountIcon } from './NavbarIcons';
import ToolbarSpacer from '../Layout/ToolbarSpacer';

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
  const currentPage = history.location.pathname;
  const user = useSelector(state => state.userState.user);
  const [menuOpen, setMenuOpen] = useState(false);
  const [selected, setSelected] = useState(history.location.pathname);

  useEffect(() => setSelected(currentPage), [currentPage]);

  const handeListItemClick = item => {
    setMenuOpen(!menuOpen);
    setSelected(item.path);
  };

  const hideMenu = () => setMenuOpen(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const drawerMenu = fullMenu.filter(item => 
    (item.visibleTo === 'admin' && user.role === 'admin') || 
    item.visibleTo === 'user');

  return (
    user ?
    <div id="navbar">
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={toggleMenu}>
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
            to={{ pathname: appBarMenu.addStory.path }}
          >
            <AddIcon className={classes.icon} />
            {appBarMenu.addStory.text}
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer variant="persistent" open={menuOpen}>
        <ToolbarSpacer />
          <List>
            {drawerMenu.map((item, index) => (
              <ListItem 
                key={index}
                button 
                onClick={() => handeListItemClick(item)}
                component={Link} 
                to={item.path} 
                selected={selected === item.path}
              >
                { item.icon }
                <ListItemText 
                  className={classes.drawerMenuText} 
                  primary={item.text} 
                />
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