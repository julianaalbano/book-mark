import React from 'react';
import { Link } from 'react-router-dom';

const Nav = props => {
  return (
    <div id="nav-container">
      <Link to="/">
        <p>Home</p>
        {/* <img src="hh.png" id="nav-logo" /> */}
      </Link>
      <div id="search-bar">Search</div>
    </div>
  );
};

export default Nav;
