import React from 'react';
import { Helmet } from 'react-helmet';

import './all.scss';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import useSiteMetadata from './useSiteMetadata';

const Layout = ({ children }) => {
  const { title, description } = useSiteMetadata();
  return (
    <>
      <Helmet>
        <html lang="en" />
        <title>{title}</title>
        <meta name="description" content={description} />
        <link
          href="https://fonts.googleapis.com/css2?family=Work+Sans:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        <link rel="apple-touch-icon" sizes="180x180" href="/img/apple-touch-icon.png" />
        <link rel="icon" type="image/png" href="/img/favicon-32x32.png" sizes="32x32" />
        <link rel="icon" type="image/png" href="/img/favicon-16x16.png" sizes="16x16" />
        <meta property="og:type" content="website" />
        <meta property="og:title" content={title} />
        <meta property="og:url" content="/" />
        <meta property="og:image" content="/img/og-image.jpg" />
      </Helmet>{' '}
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  );
};

export default Layout;
