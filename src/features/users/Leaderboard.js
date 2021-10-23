import { useSelector } from 'react-redux';
import UserCard from './UserCard';
import { getAllUsers } from './usersSlice';

const Leaderboard = () => {
  const users = useSelector(getAllUsers);

  const leaderboard = [...users]
    .sort(
      (a, b) =>
        b.questions.length +
        Object.keys(b.answers).length -
        (a.questions.length + Object.keys(a.answers).length),
    )
    .map((user) => <UserCard user={user} key={user.id} />);
  return leaderboard;
};

export default Leaderboard;
