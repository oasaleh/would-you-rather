import { useDispatch, useSelector } from 'react-redux';
import {
  Route,
  Switch,
  NavLink,
  Link,
  Redirect,
  useHistory,
} from 'react-router-dom';
import LoginPage from './LoginPage';
import UserCard from './UserCard';
import {
  getAllUsers,
  selectUserById,
  selectAuthUser,
  loggedIn,
} from './usersSlice';

const Leaderboard = () => {
  const authUser = useSelector(selectAuthUser);
  const users = useSelector(getAllUsers);
  const leaderboard = [...users]
    .sort(
      (a, b) =>
        b.questions.length +
        Object.keys(b.answers).length -
        (a.questions.length + Object.keys(a.answers).length),
    )
    .map((user) => <UserCard user={user} key={user.id} />);
  if (authUser) {
    return <div>{leaderboard}</div>;
  }
  return <LoginPage />;
};

export default Leaderboard;
