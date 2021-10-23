import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  NavLink,
  Link,
  Redirect,
} from 'react-router-dom';
import {
  getAllUsers,
  selectUserById,
  selectAuthUser,
  fetchUsers,
} from '../users/usersSlice';
import { addAnswer, fetchQuestions } from './questionsSlice';
import Time from './Time';
import './style.css';
import LoginPage from '../users/LoginPage';

const QuestionExcerpt = ({ question }) => {
  const author = useSelector((state) => selectUserById(state, question.author));
  const authUser = useSelector(selectAuthUser);
  const dispatch = useDispatch();
  let answeredQuestion = false;
  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/login' } };
  const optionOneAnswers = question.optionOne.votes.length;
  const optionTwoAnswers = question.optionTwo.votes.length;
  const optionOnePercentage = parseInt(
    (optionOneAnswers / (optionOneAnswers + optionTwoAnswers)) * 100,
    10,
  );
  const optionTwoPercentage = parseInt(
    (optionTwoAnswers / (optionOneAnswers + optionTwoAnswers)) * 100,
    10,
  );
  const totalAnswers = optionOneAnswers + optionTwoAnswers;
  let chosenAnswer = null;
  if (authUser && Object.keys(authUser.answers).includes(question.id)) {
    answeredQuestion = true;
    if (question.optionOne.votes.includes(authUser.id)) {
      chosenAnswer = 'optionOne';
    } else if (question.optionTwo.votes.includes(authUser.id)) {
      chosenAnswer = 'optionTwo';
    }
  }

  // function isAnswered(aQuestion, aUser) {
  //   if (authUser && Object.keys(authUser.answers).includes(question.id)) {
  //     return true;
  //   }
  //   return false;
  // }

  const answeredStyle = {
    backgroundColor: 'blue',
    color: 'white',
    borderRadius: '5px',
  };

  function handleClick(e) {
    e.preventDefault();
    if (authUser && !answeredQuestion) {
      const answer = {
        authedUser: authUser.id,
        qid: question.id,
        answer: e.target.value,
      };
      dispatch(addAnswer(answer));
      dispatch(fetchQuestions());
      dispatch(fetchUsers());
    } else if (!authUser) {
      history.replace(from);
    }
  }
  // voting mechanism
  return (
    <div className="questionContainer">
      <div className="questionHeader">
        <div className="imgContainer">
          <img src={author.avatarURL} alt={author.name} />
        </div>
        <h4>{author.name}</h4>
      </div>
      <Time timestamp={question.timestamp} />
      <div className="questionBody">
        <h5>Would you rather...</h5>
        <div className="questionChoices">
          <div>
            <button
              type="button"
              value="optionOne"
              style={chosenAnswer === 'optionOne' ? answeredStyle : null}
              onClick={handleClick}
            >
              {question.optionOne.text}
            </button>
            {answeredQuestion ? (
              <>
                <p>Number of people answered: {optionOneAnswers}</p>
                <p>{`${optionOnePercentage}%`}</p>
              </>
            ) : null}
          </div>
          <div>
            <button
              type="button"
              style={chosenAnswer === 'optionTwo' ? answeredStyle : null}
              value="optionTwo"
              onClick={handleClick}
            >
              {question.optionTwo.text}
            </button>
            {answeredQuestion ? (
              <>
                <p>Number of people answered: {optionTwoAnswers}</p>
                <p>{`${optionTwoPercentage}%`}</p>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <Link to={`/question/${question.id}`}>View Question</Link>
    </div>
  );
};

export default QuestionExcerpt;
