/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

function NavBar(props) {
  const { routes } = props;
  return (
    <div className="shadow-sm mb-5 bg-white rounded">
      <ul className="nav nav-dark bg-dark flex-row justify-content-left">
        {routes.map((route, i) => (
          <li className="nav-item" key={i}>
            {route.action ? <a className="nav-link text-white" href="/" onClick={(e) => { e.preventDefault(); route.action(e); }}>Log out</a> : <Link className="nav-link text-white" to={route.url}>{route.name}</Link>}
          </li>
        ))}
      </ul>
    </div>
  );
}

NavBar.propTypes = {
  routes: PropTypes.arrayOf(PropTypes.object),
};

NavBar.defaultProps = {
  routes: [],
};

export default NavBar;
