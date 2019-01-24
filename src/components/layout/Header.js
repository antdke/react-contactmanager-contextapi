// This is a stateless "dumb" component so it didnt need to be a class component

import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Header = props => {
  const { branding } = props;
  return (
    <nav className="navbar navbar-expand-sm navbar-dark bg-danger mb-3 py-0">
      <div className="container">
        <a href="/" className="navbar-brand">
          {branding}
        </a>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              {/* Links to other components as pages */}
              <Link to="/" className="nav-link">
                <i className="fas fa-home" /> Home
              </Link>
            </li>
            <li>
              <Link to="/addcontact" className="nav-link">
                <i className="fas fa-plus" /> Add
              </Link>
            </li>
            <li>
              <Link to="/about" className="nav-link">
                <i className="fas fa-question" /> About
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

// ensures that something is there, in case I forgot this prop value
Header.defaultProps = {
  branding: 'My App'
};

Header.propTypes = {
  branding: PropTypes.string.isRequired
};

export default Header;
