import React from 'react';
import { Route, Redirect, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Navbar from '../../components/Navbar/Navbar';
import HomePage from '../../pages/Home/Home';
import LogoutPage from '../../pages/Logout/Logout';
import AddPostPage from '../../pages/AddPost/AddPost';
import PageNotFound from '../PageNotFound';
import ProfilePage from '../../pages/Profile/Profile';
import MessagesPage from '../../pages/Messages/Messages';
import MyStoriesPage from '../../pages/MyStories/MyStories';
import AllUsersPage from '../../pages/AllUsers/AllUsers';
import UserStoriesPage from '../../pages/UserStories/UserStories';

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