import { Link } from 'react-router-dom';

export function Navigation() {
  return (
    <nav className="bottom-nav">
      <Link to="/">Home</Link>
      <Link to="/learn">Learn</Link>
      <Link to="/practice">Practice</Link>
      <Link to="/profile">Profile</Link>
      <Link to="/social">Social</Link>
    </nav>
  );
} 