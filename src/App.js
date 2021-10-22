import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Link,
} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Navbar from './app/Navbar';
import QuestionsList from './features/questions/QuestionsList';
import QuestionView from './features/questions/QuestionView';
import QuestionExcerpt from './features/questions/QuestionExcerpt';
import LoginPage from './features/users/LoginPage';
import Leaderboard from './features/users/Leaderboard';
import AddQuestionForm from './features/questions/AddQuestionForm';
import {
  getAllUsers,
  selectUserById,
  selectAuthUser,
  fetchUsers,
} from './features/users/usersSlice';
import { store } from './app/store';

const App = () => {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route exact path="/leaderboard">
            <Leaderboard />
          </Route>
          <Route exact path="/login">
            <LoginPage />
          </Route>
          <Route exact path="/question/:id">
            <QuestionView />
          </Route>
          <Route exact path="/add">
            <AddQuestionForm />
          </Route>
          <Route path="/home">
            <QuestionsList />
          </Route>
        </Switch>
      </>
    </Router>
  );
};

export default App;
