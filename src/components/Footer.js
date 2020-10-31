import { Link } from 'gatsby';
import React from 'react';

const Footer = () => (
  <div className="wrapper">
    <footer className="footer">
      <p>
        © Rebecca Falvey • <Link to="/contact/">Contact</Link> • <a href="/">Instagram</a>
      </p>
    </footer>
  </div>
);
export default Footer;
