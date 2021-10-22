/* eslint-disable no-unused-expressions */
import { useDispatch, useSelector } from 'react-redux';
import { useState, useEffect } from 'react';
import { Route, Switch, NavLink, Link, useHistory } from 'react-router-dom';
import {
  getAllUsers,
  selectUserById,
  setAuthUser,
  setLoggedIn,
  selectAuthUser,
} from '../features/users/usersSlice';

const Navbar = () => {
  const userId = useSelector((state) => state.users.authUser);
  const loggedIn = useSelector((state) => state.users.loggedIn);
  const authUser = useSelector(selectAuthUser);

  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);
  const history = useHistory();

  function handleClick() {
    loggedIn
      ? dispatch(setLoggedIn(false)) && dispatch(setAuthUser(''))
      : history.push(`/login`);
  }
  return (
    <nav>
      <div>
        <h2>Would you rather...?</h2>
      </div>
      <div>
        {authUser ? <p>Welcome, {authUser.name}</p> : null}
        <Link to="/home">Dashboard</Link>
        <Link to="/leaderboard">Leaderboard</Link>
        <button type="button" onClick={handleClick}>
          {loggedIn ? 'Log Out' : 'Log In'}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
