import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { messageActions } from '../../../redux/action-creators/index';
import { postActions } from '../../../redux/action-creators/post';
import Post from '../../Elements/Post/Post';
import PostList from '../../Elements/PostList/PostList';
import { makeStyles } from '@material-ui/core';

const useStyles = makeStyles(theme => ({
  wrapper: {
    minHeight: '70vh'
  }
}));

const HomePage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const post = useSelector(state => state.postState.post);
  const posts = useSelector(state => state.postState.currentPosts);
  const reachedEnd = useSelector(state => state.postState.reachedEnd);
  const user = useSelector(state => state.userState.user);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);
  const [forceUpdate, setForceUpdate] = useState(0);

  useEffect(() => {
    if (!reachedEnd) dispatch(postActions.getAll(page, limit));
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setPage(page => ++page);
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChatClick = username => dispatch(messageActions.startNewChat(username));

  const handleFavoriteClick = post => {
    let postData = {...post};
    const isAlreadyFavoriteIIdx = postData.favoriteOf.indexOf(user.pseudoname);

    isAlreadyFavoriteIIdx === -1 ?
    postData.favoriteOf.push(user.pseudoname) :
    postData.favoriteOf.splice(isAlreadyFavoriteIIdx, 1);

    dispatch(postActions.update(postData));
  };

  const handleDeleteClick = post => {
    dispatch(postActions.remove(post._id));
  }
  
  return (
    <div className={classes.wrapper}>
      <PostList 
        posts={posts} 
        handleFavoriteClick={handleFavoriteClick} 
        handleChatClick={handleChatClick}
        handleDeleteClick={handleDeleteClick}
        showPostActions={true}
        showPublicOnly={true}
        />
    </div>
  )
}

export default HomePage;