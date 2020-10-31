import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import Content, { HTMLContent } from '../components/Content';
import Layout from '../components/Layout';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';

export const PageTemplate = ({ content, contentComponent, featuredImage, title }) => {
  const PageContent = contentComponent || Content;
  return (
    <div className="wrapper">
      <article className="page">
        {featuredImage ? (
          <div className="feature-image">
            <PreviewCompatibleImage
              imageInfo={{
                image: featuredImage,
                alt: `Featured image thumbnail for "${title}"`,
              }}
            />
          </div>
        ) : null}
        <div className="page-content">
          <PageContent content={content} />
        </div>
      </article>
    </div>
  );
};

PageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  featuredImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  title: PropTypes.string,
};

const Page = ({ data }) => {
  const { markdownRemark: page } = data;
  return (
    <Layout>
      {' '}
      <Helmet>
        <title>{page.frontmatter.title}</title>
        <meta name="description" content={`${page.frontmatter.description}`} />
      </Helmet>{' '}
      <PageTemplate
        content={page.html}
        contentComponent={HTMLContent}
        featuredImage={page.frontmatter.featuredImage}
        title={page.frontmatter.title}
      />{' '}
    </Layout>
  );
};

Page.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
};

export default Page;

export const pageQuery = graphql`
  query PageQuery($id: String!) {
    markdownRemark(id: { eq: $id }) {
      id
      html
      frontmatter {
        title
        description
        featuredImage {
          childImageSharp {
            fluid(maxWidth: 1560, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
