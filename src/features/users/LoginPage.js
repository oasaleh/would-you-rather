import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import {
  getAllUsers,
  selectUserById,
  setAuthUser,
  setLoggedIn,
} from './usersSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);
  const history = useHistory();
  let usernames = '';

  usernames = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  function handleChange(e) {
    dispatch(setAuthUser(users.find((user) => user.id === e.target.value)));
    dispatch(setLoggedIn(true));
    history.push(`/home`);
  }
  return (
    <>
      <h3>Login</h3>
      <select onChange={handleChange}>
        <option value="default" selected disabled>
          Select a User
        </option>
        {usernames}
      </select>
    </>
  );
};

export default LoginPage;
