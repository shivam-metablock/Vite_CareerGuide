import { Link, useLocation } from 'react-router-dom';
import '../App.css';

function Navbar() {
  const location = useLocation();

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="logo">
          CareerGuide
        </Link>
        <ul className="nav-links">
          <li><Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link></li>
          <li><Link to="/class10">Class 10</Link></li>
          <li><Link to="/stream">Stream</Link></li>
          <li><Link to="/budget">Budget</Link></li>
          <li><Link to="/ai">AI Guidance</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;

