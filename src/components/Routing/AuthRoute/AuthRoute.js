import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import HomePage from '../../Pages/Home/Home';
import LogoutPage from '../../Pages/Logout/Logout';
import AddPostPage from '../../Pages/AddPost/AddPost';
import Navbar from '../../Elements/Navbar/Navbar';
import PageNotFound from '../PageNotFound';
import ProfilePage from '../../Pages/Profile/Profile';
import MessagesPage from '../../Pages/Messages/Messages';
import MyStoriesPage from '../../Pages/MyStories/MyStories';
import AllUsersPage from '../../Pages/AllUsers/AllUsers';
import UserStoriesPage from '../../Pages/UserStories/UserStories';

const AuthRoute = () => {
  const user = useSelector(state => state.userState.user);
  let location = useLocation();

  const authComponents = {
    '/': HomePage,
    '/profile': ProfilePage,
    '/add-story': AddPostPage,
    '/messages' : MessagesPage,
    '/mystories' : MyStoriesPage,
    '/users' : AllUsersPage,
    '/user-stories': UserStoriesPage,
    '/logout': LogoutPage,
  }

  const AuthComponent = authComponents[location.pathname];

  return (
    <Route render={() => (
      user && AuthComponent ?
      <React.Fragment>
        <Navbar />
        <AuthComponent />
      </React.Fragment> :
      AuthComponent ?
      <Redirect to={{ pathname: '/login' }} /> :
      <Route component={PageNotFound} />
    )} />
    
  )
}

export default AuthRoute;