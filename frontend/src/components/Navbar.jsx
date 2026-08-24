import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const Navbar = () => {
  const { token, logout } = useContext(AuthContext);

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">FitZone</Link>
      <div className="navbar-links">
        <Link to="/classes" className="navbar-link">Classes</Link>
        <Link to="/my-bookings" className="navbar-link">My Bookings</Link>
        <Link to="/admin" className="navbar-link">Admin</Link>
        {token ? (
          <button onClick={logout} className="btn btn-outline btn-sm">Logout</button>
        ) : (
          <Link to="/" className="btn btn-primary btn-sm">Login</Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
