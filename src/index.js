import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider, useDispatch, useSelector } from 'react-redux';
import App from './App';
import { store } from './app/store';
import {
  fetchUsers,
  getAllUsers,
  selectUserById,
  setAuthUser,
  setLoggedIn,
} from './features/users/usersSlice';

store.dispatch(fetchUsers());
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
