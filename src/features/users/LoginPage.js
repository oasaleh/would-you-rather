import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, selectUserById, setAuthUser } from './usersSlice';

const LoginPage = () => {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsers);

  const userNames = users.map((user) => (
    <option key={user.id}>{user.name}</option>
  ));

  function handleChange(e) {
    console.log(e);
    setAuthUser(e.target.value);
  }
  return (
    <>
      <h3>Login</h3>
      <select onChange={handleChange}>{userNames}</select>
    </>
  );
};

export default LoginPage;
