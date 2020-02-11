import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostList from '../../Elements/PostList/PostList';

const UserStoriesPage = () => {
  const dispatch = useDispatch();
  const userPosts = useSelector(state => state.postState.currentPosts);
  
  return (
    <div>
      <PostList posts={userPosts} showPostActions={false} />
    </div>
  )
}

export default UserStoriesPage;