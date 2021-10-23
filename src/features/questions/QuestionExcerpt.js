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
import Time from './Time';
import './style.css';

const QuestionExcerpt = ({ question }) => {
  const author = useSelector((state) => selectUserById(state, question.author));
  const authUser = useSelector(selectAuthUser);
  let answeredQuestion = false;
  const optionOneAnswers = question.optionOne.votes.length;
  const optionTwoAnswers = question.optionTwo.votes.length;
  const totalAnswers = optionOneAnswers + optionTwoAnswers;
  if (authUser && Object.keys(authUser.answers).includes(question.id)) {
    answeredQuestion = true;
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
            <p>{question.optionOne.text}</p>
            {answeredQuestion ? (
              <>
                <p>{optionOneAnswers}</p>
                <p>{`${(optionOneAnswers / totalAnswers) * 100}%`}</p>
              </>
            ) : null}
          </div>
          <div>
            <p>{question.optionTwo.text}</p>
            {answeredQuestion ? (
              <>
                <p>{optionTwoAnswers}</p>
                <p>{`${(optionTwoAnswers / totalAnswers) * 100}%`}</p>
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
