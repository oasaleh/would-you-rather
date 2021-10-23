import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import Header from './app/Header';
import PrivateRoute from './utilities/PrivateRoute';
import QuestionsList from './features/questions/QuestionsList';
import QuestionView from './features/questions/QuestionView';
import LoginPage from './features/users/LoginPage';
import Leaderboard from './features/users/Leaderboard';
import AddQuestionForm from './features/questions/AddQuestionForm';
import NotFound from './app/NotFound';

const App = () => {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Switch>
          <Route exact path="/login">
            <LoginPage />
          </Route>

          <Route exact path={['/home/questions', '/home', '/']}>
            <QuestionsList />
          </Route>

          <PrivateRoute exact path="/leaderboard">
            <Leaderboard />
          </PrivateRoute>

          <PrivateRoute exact path="/question/:id">
            <QuestionView />
          </PrivateRoute>

          <PrivateRoute exact path="/add">
            <AddQuestionForm />
          </PrivateRoute>

          <Route path="*">
            <NotFound />
          </Route>
        </Switch>
      </>
    </BrowserRouter>
  );
};

export default App;
