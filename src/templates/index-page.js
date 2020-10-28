import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import Content, { HTMLContent } from '../components/Content';

export const IndexPageTemplate = ({ content, contentComponent, image, title }) => {
  const PageContent = contentComponent || Content;
  const backgroundImage = `url(${
    !!image.childImageSharp ? image.childImageSharp.fluid.src : image
  })`;

  return (
    <div>
      <section>
        <div style={{ backgroundImage }} />
        <h2>{title}</h2>
        <PageContent content={content} />
      </section>
    </div>
  );
};

IndexPageTemplate.propTypes = {
  content: PropTypes.string,
  contentComponent: PropTypes.func,
  image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
};

const IndexPage = ({ data }) => {
  const { frontmatter, html } = data.markdownRemark;

  return (
    <Layout>
      <div>
        <IndexPageTemplate
          content={html}
          contentComponent={HTMLContent}
          image={frontmatter.image}
          title={frontmatter.title}
        />
      </div>
    </Layout>
  );
};

IndexPage.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.shape({
      frontmatter: PropTypes.object,
    }),
  }),
};

export default IndexPage;

export const pageQuery = graphql`
  query IndexPageTemplate {
    markdownRemark(frontmatter: { templateKey: { eq: "index-page" } }) {
      html
      frontmatter {
        title
        image {
          childImageSharp {
            fluid(maxWidth: 2048, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
