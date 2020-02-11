import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { postActions } from '../../../redux/action-creators/post';
import { AppBar, Tabs, Tab, Typography } from '@material-ui/core';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import PostList from '../../Elements/PostList/PostList';
import { alertMessages } from '../../../misc/alertMessages';
import { messageActions } from '../../../redux/action-creators/index';

const useStyles = makeStyles(theme => ({
  hidden: {
    display: 'none'
  },
  visible: {
    display: 'block'
  },
  warning: {
    width: 600,
  },
  tabs: {
    position: 'absolute'
  },
  wrapper: {
    width: 600,
    minHeight: '70vh'
  },
  info: {
    backgroundColor: 'white',
    whiteSpace: 'pre-wrap',
    padding: '15px'
  }
}));

const MyStoriesPage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const user = useSelector(state => state.userState.user);
  const post = useSelector(state => state.postState.post);
  const posts = useSelector(state => state.postState.currentPosts);
  const [currentTab, SetCurrentTab] = useState(0);
  

  useEffect(() => {
    if (currentTab === 0) dispatch(postActions.getByUsername(user.pseudoname));
    if (currentTab === 1) dispatch(postActions.getFavoritesByUsername(user.pseudoname));
  }, [currentTab]);

  const handleChatClick = username => dispatch(messageActions.startNewChat(username));

  const handleFavoriteClick = post => {
    let postData = post;
    const isAlreadyFavoriteIIdx = postData.favoriteOf.indexOf(user.username);

    isAlreadyFavoriteIIdx === -1 ?
    postData.favoriteOf.push(user.username) :
    postData.favoriteOf.splice(isAlreadyFavoriteIIdx, 1);

    dispatch(postActions.update(post));
  };

  const handleDeleteClick = post => {
    dispatch(postActions.remove(post._id));

  }

  return (
    <div className={classes.wrapper}>
      <AppBar position="static">
        <Tabs
          value={currentTab}
          onChange={(e, value) => SetCurrentTab(value)}
          variant="fullWidth"
        >
          <Tab label="Historiene Mine" icon={<ImportContactsIcon />} />
          <Tab label="Favoritt historier" icon={<FavoriteIcon />} />
        </Tabs>
      </AppBar>
      
      <div className={currentTab == 0 ? classes.visible : classes.hidden}>
          {posts && posts.length === 0 ?
          <div className={classes.info}>
            <Typography variant="h6" className={classes.warning}>
              {alertMessages.NO_USER_POSTS.message}
            </Typography>
          </div> :
          <PostList 
          posts={posts} 
          handleFavoriteClick={handleFavoriteClick} 
          handleChatClick={handleChatClick} 
          handleDeleteClick={handleDeleteClick}
          showPostActions={true}
          showPublicOnly={false}/>}
      </div>

      <div className={currentTab == 1 ? classes.visible : classes.hidden}>
          {posts && posts.length === 0 ?
          <div className={classes.info}>
            <Typography variant="h6" >
              {alertMessages.NO_FAVORITE_POSTS.message}
            </Typography> 
          </div> :
          <PostList 
            posts={posts} 
            handleFavoriteClick={handleFavoriteClick} 
            handleChatClick={handleChatClick} 
            handleDeleteClick={handleDeleteClick}
            showPostActions={true}
            showPublicOnly={true}/>}
      </div>
    </div>
  )
}

export default MyStoriesPage;