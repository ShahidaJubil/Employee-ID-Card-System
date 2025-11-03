import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { HiOutlineMenu, HiX } from 'react-icons/hi';
import './Navbar.css';

export default function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [isOpen, setIsOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/login');
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      <div className="logo">Logo</div>

      <div className={`nav-links ${isOpen ? 'active' : ''}`}>
        <Link to="/home" onClick={() => setIsOpen(false)}>Dashboard</Link>
        <Link to="/register" onClick={() => setIsOpen(false)}>Register Employee</Link>

        {user ? (
          <button className="signout-btn" onClick={handleSignOut}>
            Sign Out
          </button>
        ) : (
          <>
            <Link to="/login" onClick={() => setIsOpen(false)}>Login</Link>
            <Link to="/signup" onClick={() => setIsOpen(false)}>Signup</Link>
          </>
        )}
      </div>

      <div className="hamburger" onClick={toggleMenu}>
        {isOpen ? <HiX size={28} color="#fff" /> : <HiOutlineMenu size={28} color="#fff" />}
      </div>
    </nav>
  );
}
