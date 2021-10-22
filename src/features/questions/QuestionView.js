import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import QuestionExcerpt from './QuestionExcerpt';
import LoginPage from '../users/LoginPage';
import { selectQuestionById } from './questionsSlice';
import {
  getAllUsers,
  selectUserById,
  selectAuthUser,
  loggedIn,
} from '../users/usersSlice';

const QuestionView = () => {
  const { id } = useParams();
  const question = useSelector((state) => selectQuestionById(state, id));
  const authUser = useSelector(selectAuthUser);
  if (authUser) {
    return <QuestionExcerpt question={question} />;
  }
  return <LoginPage />;
};

export default QuestionView;
