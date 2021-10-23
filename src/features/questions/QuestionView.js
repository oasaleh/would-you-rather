import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import QuestionExcerpt from './QuestionExcerpt';
import LoginPage from '../users/LoginPage';
import { selectQuestionById } from './questionsSlice';
import { selectAuthUser } from '../users/usersSlice';
import NotFound from '../../app/NotFound';

const QuestionView = () => {
  const { id } = useParams();
  const question = useSelector((state) => selectQuestionById(state, id));
  const authUser = useSelector(selectAuthUser);

  if (authUser && question) {
    return <QuestionExcerpt question={question} />;
  }
  if (!authUser) {
    return <LoginPage />;
  }
  return <NotFound />;
};

export default QuestionView;
