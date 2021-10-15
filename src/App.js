import React, { useEffect } from 'react';
import Navbar from './app/Navbar';
import QuestionsList from './features/questions/QuestionsList';
import LoginPage from './features/users/LoginPage';

const App = () => {
  return (
    <>
      <Navbar />
      <LoginPage />
      <QuestionsList />
    </>
  );
};

export default App;
