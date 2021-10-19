import React, { useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Link,
} from 'react-router-dom';
import Navbar from './app/Navbar';
import QuestionsList from './features/questions/QuestionsList';
import LoginPage from './features/users/LoginPage';

const App = () => {
  return (
    <Router>
      <>
        <Navbar />
        <Switch>
          <Route path="/questions">
            <QuestionsList />
          </Route>
          <Route path="/">
            <LoginPage />
          </Route>
        </Switch>
      </>
    </Router>
  );
};

export default App;
