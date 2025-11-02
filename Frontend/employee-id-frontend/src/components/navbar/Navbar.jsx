import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user')); 

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <nav className="navbar">
      <h2>Logo</h2>
      <div className="nav-links">
        <Link to="/home">Dashboard</Link>
        <Link to="/register">Register Employee</Link>

        {user ? (
          <button className="signout-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
