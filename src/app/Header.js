/* eslint-disable no-unused-expressions */
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import styled from 'styled-components';
import {
  setAuthUser,
  setLoggedIn,
  selectAuthUser,
} from '../features/users/usersSlice';
import Navbar from './Navbar';
import UserMenu from './UserMenu';

const StyledHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
`;
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
    <StyledHeader>
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-evenly',
          width: '70%',
        }}
      >
        <h2>Would you rather...?</h2>
        <button type="button" onClick={handleClick} style={{ height: '50px' }}>
          {loggedIn ? 'Log Out' : 'Log In'}
        </button>
      </div>

      <div>
        {authUser ? <p>Welcome, {authUser.name}</p> : <p>Welcome!</p>}
        <Navbar />
      </div>
    </StyledHeader>
  );
};

export default Header;
