import React, { useEffect } from 'react';
import Navbar from './app/Navbar';
import QuestionsList from './features/questions/QuestionsList';

const App = () => {
  return (
    <>
      <Navbar />
      <QuestionsList />
    </>
  );
};

export default App;
