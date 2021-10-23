import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useLocation } from 'react-router-dom';
import { getAllUsers, setAuthUser, setLoggedIn } from './usersSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);
  const history = useHistory();
  const location = useLocation();
  let usernames = '';
  const { from } = location.state || { from: { pathname: '/' } };

  usernames = users.map((user) => (
    <option key={user.id} value={user.id}>
      {user.name}
    </option>
  ));

  function handleChange(e) {
    dispatch(setAuthUser(users.find((user) => user.id === e.target.value)));
    dispatch(setLoggedIn(true));
    // history.push(`/home`);
    history.replace(from);
  }
  return (
    <>
      <h3>Login</h3>
      <select onChange={handleChange} defaultValue="default">
        <option value="default" disabled>
          Select a User
        </option>
        {usernames}
      </select>
    </>
  );
};

export default LoginPage;
