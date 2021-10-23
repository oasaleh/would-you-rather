/* eslint-disable no-unused-expressions */
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import {
  setAuthUser,
  setLoggedIn,
  selectAuthUser,
} from '../features/users/usersSlice';
import Navbar from './Navbar';

const Header = () => {
  const loggedIn = useSelector((state) => state.users.loggedIn);
  const authUser = useSelector(selectAuthUser);

  const dispatch = useDispatch();
  const history = useHistory();

  function handleClick() {
    loggedIn
      ? dispatch(setLoggedIn(false)) && dispatch(setAuthUser(''))
      : history.push(`/login`);
  }
  return (
    <nav>
      <div>
        <h2>Would you rather...?</h2>
      </div>
      <div>
        {authUser ? <p>Welcome, {authUser.name}</p> : <p>Welcome!</p>}
        <Navbar />
        <button type="button" onClick={handleClick}>
          {loggedIn ? 'Log Out' : 'Log In'}
        </button>
      </div>
    </nav>
  );
};

export default Header;
