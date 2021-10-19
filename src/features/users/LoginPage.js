import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import {
  getAllUsers,
  selectUserById,
  setAuthUser,
  setLoggedIn,
} from './usersSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);
  const history = useHistory();

  const usernames = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  function handleChange(e) {
    console.log(e.target.value);
    dispatch(setAuthUser(users.find((user) => user.id === e.target.value)));
    dispatch(setLoggedIn(true));
    history.push(`/questions`);
  }
  return (
    <>
      <h3>Login</h3>
      <select onChange={handleChange}>{usernames}</select>
    </>
  );
};

export default LoginPage;
