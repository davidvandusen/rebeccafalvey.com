import _ from 'lodash';
import { Link } from 'gatsby';
import React from 'react';

import useCategories from './useCategories';

const Navbar = () => {
  const categories = useCategories();
  return (
    <nav>
      <div>
        <Link to="/">Rebecca Falvey</Link>
      </div>
      <ul>
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
      </ul>
    </nav>
  );
};

export default Navbar;
