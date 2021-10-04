import { configureStore } from '@reduxjs/toolkit';
import questionsReducer from '../features/questions/questionsSlice';
import usersReducer from '../features/users/usersSlice';

export const store = configureStore({
  reducer: {
    questions: questionsReducer,
    users: usersReducer,
  },
});
