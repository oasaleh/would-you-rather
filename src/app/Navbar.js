import { Link } from 'react-router-dom';
import styled from 'styled-components';

const StyledNavbar = styled.ul`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  & > a {
    list-style: none;
    margin: 0 10px;
  }
`;

function Navbar() {
  return (
    <StyledNavbar className="navbar">
      <Link to="/home">Dashboard</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/add">Add</Link>
    </StyledNavbar>
  );
}

export default Navbar;
