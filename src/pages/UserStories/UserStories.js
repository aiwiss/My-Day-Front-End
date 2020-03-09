import React from 'react';
import { useSelector } from 'react-redux';
import Post from '../../components/Post/Post';

const UserStoriesPage = () => {
  const userPosts = useSelector(state => state.postState.currentPosts);
  
  return (
    <div>
      {userPosts && userPosts.map((post, index) => 
        <React.Fragment key={index}>
          <Post 
            post={post}
            showActions={false}
          />
        </React.Fragment>
      )}
    </div>
  )
}

export default UserStoriesPage;