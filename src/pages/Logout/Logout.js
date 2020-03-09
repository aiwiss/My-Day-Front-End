import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userActions } from '../../redux/action-creators/index';


const LogoutPage = () => {
  const dispatch = useDispatch();

  dispatch(userActions.logout());

  return (
    <div>
      <h1>Successfully logged out!</h1>
    </div>
  )

}

export default LogoutPage;