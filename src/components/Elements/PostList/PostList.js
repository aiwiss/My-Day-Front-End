import React from 'react';
import Post from '../Post/Post';

const PostList = props => {
  console.log(props)
  return (
    <div>
      { props.posts &&
      <div>
          {props.posts
          .map(( post, index ) =>
            props.showPublicOnly && post.public ?
            <React.Fragment key={index}>
              <Post 
                post={post} 
                onFavoriteClick={post => props.handleFavoriteClick(post)} 
                onChatClick={username => props.handleChatClick(username)}
                onDeleteClick={id => props.handleDeleteClick(id)}
                showActions={props.showPostActions}
                />
            </React.Fragment> :
            !props.showPublicOnly ?
            <React.Fragment key={index}>
              <Post 
                post={post} 
                onFavoriteClick={post => props.handleFavoriteClick(post)} 
                onChatClick={username => props.handleChatClick(username)}
                onDeleteClick={post => props.handleDeleteClick(post)}
                showActions={props.showPostActions}
                />
            </React.Fragment> :
            null
          ) }
      </div> }
    </div>
  )
}

export default PostList;