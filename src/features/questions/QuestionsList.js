/* eslint-disable no-case-declarations */
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Link,
} from 'react-router-dom';
import {
  getAllUsers,
  selectUserById,
  selectAuthUser,
} from '../users/usersSlice';
import { getAllQuestions, fetchQuestions } from './questionsSlice';
import Time from './Time';
import './style.css';
import QuestionExcerpt from './QuestionExcerpt';

const QuestionsList = () => {
  const dispatch = useDispatch();
  const rawQuestions = useSelector(getAllQuestions);
  const questions = [...rawQuestions].sort((a, b) => b.timestamp - a.timestamp);
  // .sort((a, b) => (a.timestamp - b.timestamp));
  const authUser = useSelector(selectAuthUser);

  const questionsStatus = useSelector((state) => state.questions.status);
  const error = useSelector((state) => state.questions.error);
  const [displayedContent, setDisplayedContent] = useState('');

  let content;
  if (questionsStatus === 'loading') {
    content = <p>Loading...</p>;
  } else if (questionsStatus === 'succeeded') {
    content = questions.map((question) => (
      <Link to={`question/${question.id}`}>
        <QuestionExcerpt
          class="questionContainer"
          key={question.id}
          question={question}
        />
      </Link>
    ));
  } else if (questionsStatus === 'failed') {
    content = <p>Failed</p>;
  }
  useEffect(() => {
    if (questionsStatus === 'idle') {
      dispatch(fetchQuestions());
    }
    setDisplayedContent(content);
  }, [questionsStatus, dispatch, authUser]);

  function handleClick(e) {
    switch (e.target.value) {
      case 'myQuestions':
        const myQuestions = questions.filter(
          (question) => question.author === authUser.id,
        );
        const myQuestionsContent = myQuestions.map((question) => (
          <Link to={`/question/${question.id}`}>
            <QuestionExcerpt key={question.id} question={question} />
          </Link>
        ));
        setDisplayedContent(myQuestionsContent);
        break;
      case 'answeredQuestions':
        const answeredQuestions = questions.filter((question) =>
          Object.keys(authUser.answers).includes(question.id),
        );
        const answeredQuestionsContent = answeredQuestions.map((question) => (
          <Link to={`/question/${question.id}`}>
            <QuestionExcerpt key={question.id} question={question} />
          </Link>
        ));
        setDisplayedContent(answeredQuestionsContent);
        break;
      case 'unansweredQuestions':
        const unansweredQuestions = questions.filter(
          (question) => !Object.keys(authUser.answers).includes(question.id),
        );
        const unansweredQuestionsContent = unansweredQuestions.map(
          (question) => (
            <Link to={`/question/${question.id}`}>
              <QuestionExcerpt key={question.id} question={question} />
            </Link>
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
      {authUser ? (
        <div>
          <button type="button" value="allQuestions" onClick={handleClick}>
            All Questions
          </button>
          <button type="button" value="myQuestions" onClick={handleClick}>
            My Questions
          </button>
          <button
            type="button"
            value="unansweredQuestions"
            onClick={handleClick}
          >
            Unanswered Questions
          </button>
          <button type="button" value="answeredQuestions" onClick={handleClick}>
            Answered Questions
          </button>
        </div>
      ) : null}
      <article className="questionsListContainer">{displayedContent}</article>
    </>
  );
};

export default QuestionsList;
