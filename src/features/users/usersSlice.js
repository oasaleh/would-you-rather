/* eslint-disable no-unused-expressions */
import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { _getUsers } from '../../utilities/_DATA';

const initialState = { users: [], authUser: '', loggedIn: false };
// const initialState = [];

// createAsyncThunk is an action creator. First arg is 'type' and second arg is
// 'payload'. The fetchUsers is dispatched inside a component and extraReducers
// is listening to these dispatches. If a case matches, it runs with state and
// action (generated from createAsyncThunk) as its args.
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await _getUsers();
  // Converting response from being an array of ONE object -- that has
  // many objects -- to an array of objects.
  const users = Object.keys(response).map((key) => response[key]);
  return users;
});

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUser: (state, action) => {
      state.users.push(action.payload);
    },
    setAuthUser: (state, action) => {
      state.authUser = action.payload;
    },

    setLoggedIn: (state, action) => {
      state.loggedIn = action.payload;
    },
    setLogOut: (state, action) => {
      state.loggedIn = false;
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      // You can spread action.payload array (mutation is allowed/not really mutation.)
      // state.users.push(...action.payload);

      // Or use concat to return a new array (this is not mutating state.)
      // state.users = state.users.concat(action.payload);

      // Or assign a new value to state (mutation is allowed/not really mutation.)
      state.users = action.payload;
    });
  },
});

// selectors
export const getAllUsers = (state) => state.users.users;
export const selectUserById = (state, userId) =>
  state.users.users.find((user) => user.id === userId);
export const selectAuthUser = (state) =>
  state.users.users.find((user) => user.id === state.users.authUser.id);
export const { addUser, setAuthUser, setLoggedIn, setLogOut, loggedIn } =
  usersSlice.actions;
export default usersSlice.reducer;
