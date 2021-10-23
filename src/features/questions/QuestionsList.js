/* eslint-disable no-case-declarations */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BrowserRouter as Router, Link } from 'react-router-dom';
import { selectAuthUser } from '../users/usersSlice';
import { getAllQuestions, fetchQuestions } from './questionsSlice';

import './style.css';
import QuestionExcerpt from './QuestionExcerpt';
import UserMenu from '../../app/UserMenu';

const QuestionsList = () => {
  const dispatch = useDispatch();
  const rawQuestions = useSelector(getAllQuestions);
  const questions = [...rawQuestions].sort((a, b) => b.timestamp - a.timestamp);
  const authUser = useSelector(selectAuthUser);
  const questionsStatus = useSelector((state) => state.questions.status);
  const error = useSelector((state) => state.questions.error);
  const [displayedContent, setDisplayedContent] = useState('');

  let content;
  if (questionsStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (questionsStatus === 'succeeded') {
    content = questions.map((question) => (
      <QuestionExcerpt
        class="questionContainer"
        key={question.id}
        question={question}
      />
    ));
  } else if (questionsStatus === 'failed') {
    content = <p>Failed</p>;
  }
  useEffect(() => {
    if (questionsStatus === 'idle') {
      dispatch(fetchQuestions());
    }
    setDisplayedContent(content);
  }, [questionsStatus, authUser, rawQuestions]);
  // deleted dispatch from useEffect

  function handleClick(e) {
    switch (e.target.value) {
      case 'myQuestions':
        const myQuestions = questions.filter(
          (question) => question.author === authUser.id,
        );
        const myQuestionsContent = myQuestions.map((question) => (
          <QuestionExcerpt key={question.id} question={question} />
        ));
        setDisplayedContent(myQuestionsContent);
        break;
      case 'answeredQuestions':
        const answeredQuestions = questions.filter((question) =>
          Object.keys(authUser.answers).includes(question.id),
        );
        const answeredQuestionsContent = answeredQuestions.map((question) => (
          <QuestionExcerpt key={question.id} question={question} />
        ));
        setDisplayedContent(answeredQuestionsContent);
        break;
      case 'unansweredQuestions':
        const unansweredQuestions = questions.filter(
          (question) => !Object.keys(authUser.answers).includes(question.id),
        );
        const unansweredQuestionsContent = unansweredQuestions.map(
          (question) => (
            <QuestionExcerpt key={question.id} question={question} />
          ),
        );
        setDisplayedContent(unansweredQuestionsContent);
        break;
      default:
        setDisplayedContent(content);
    }
  }

  return (
    <>
      {authUser ? <UserMenu handleClick={handleClick} /> : null}
      <article className="questionsListContainer">{displayedContent}</article>
    </>
  );
};

export default QuestionsList;
