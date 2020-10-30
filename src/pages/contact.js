import React from 'react';

import Layout from '../components/Layout';
import { Helmet } from 'react-helmet';

const Contact = () => (
  <Layout>
    <section>
      <Helmet>
        <title>Contact Rebecca Falvey</title>
        <meta name="description" content="A form to contact Rebecca Falvey." />
      </Helmet>
      <article className="page">
        <div className="page-content">
          <h1>Contact</h1>
          <form name="contact" method="post" action="/thanks/" data-netlify="true">
            <p>
              <label htmlFor="contact-name">Your name</label>{' '}
              <input id="contact-name" name="name" required={true} />
            </p>
            <p>
              <label htmlFor="contact-email">Email</label>{' '}
              <input id="contact-email" name="email" required={true} type="email" />
            </p>
            <p>
              <label htmlFor="contact-message">Message</label>{' '}
              <textarea id="contact-message" name="message" required={true} />
            </p>
            <p>
              <button type="submit">Send</button>
            </p>
          </form>
        </div>
      </article>
    </section>
  </Layout>
);

export default Contact;
