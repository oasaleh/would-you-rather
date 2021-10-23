import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <ul>
      <Link to="/home">Dashboard</Link>
      <Link to="/leaderboard">Leaderboard</Link>
      <Link to="/add">Add</Link>
    </ul>
  );
}

export default Navbar;
