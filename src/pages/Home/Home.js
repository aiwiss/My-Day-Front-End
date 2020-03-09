import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core';
import { messageActions, postActions } from '../../redux/action-creators/index';
import Post from '../../components/Post/Post';

const useStyles = makeStyles(theme => ({
  wrapper: {
    minHeight: '70vh'
  }
}));

const HomePage = () => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const pageLimit = 10;
  const [page, setPage] = useState(0);
  const user = useSelector(state => state.userState.user);
  const posts = useSelector(state => state.postState.currentPosts);
  const reachedEnd = useSelector(state => state.postState.reachedEnd);

  useEffect(() => {
    if (!reachedEnd) dispatch(postActions.getAll(page, pageLimit));
  }, [page]);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
    setPage(page => ++page);
  }

  useEffect(() => {
    dispatch(postActions.getAll(page, pageLimit));
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChatClick = username => dispatch(messageActions.startNewChat(username));

  const handleFavoriteClick = post => {
    dispatch(postActions.update(post));
  };

  const handlePublicClick = post => {
    dispatch(postActions.update(post));
  }

  const handleDeleteClick = post => {
    dispatch(postActions.remove(post._id));
  }

  const getPublicPosts = () => {
    return posts.filter(post => post.public);
  }
  
  return (
    <div className={classes.wrapper}>
      {posts && getPublicPosts().map((post, index) =>
        <React.Fragment key={index}>
          <Post 
            post={post}
            user={user}
            onFavoriteClick={handleFavoriteClick}
            onPublicClick={handlePublicClick}
            onChatClick={handleChatClick}
            onDeleteClick={handleDeleteClick}
            showActions={true}
          />
        </React.Fragment>
        )}
    </div>
  )
}

export default HomePage;