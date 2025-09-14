import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-primary mb-4">
      <div className="container">
        <Link to="/" className="navbar-brand">User Management</Link>
        <div>
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className={`nav-link${location.pathname === '/' ? ' active' : ''}`}>Home</Link>
            </li>
            <li className="nav-item">
              <Link to="/users/new" className={`nav-link${location.pathname === '/users/new' ? ' active' : ''}`}>Add User</Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
