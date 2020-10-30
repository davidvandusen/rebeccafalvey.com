import _ from 'lodash';
import { Link } from 'gatsby';
import React from 'react';

import useCategories from './useCategories';

const Navbar = () => {
  const categories = useCategories();
  return (
    <nav className="navigation" role="navigation">
      <div className="branding">
        <Link to="/">Rebecca Falvey</Link>
      </div>
      <ul className="navigation-links">
        {Array.from(categories)
          .sort()
          .map((category) => (
            <li key={category}>
              <Link to={`/${_.kebabCase(category)}/`}>{category}</Link>
            </li>
          ))}
        <li>
          <Link to="/contact/">Contact</Link>
        </li>
        <li>
          <Link to="/">
            <img src="/img/instagram-logo.svg" alt="Instagram Logo" height="36" width="29" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
