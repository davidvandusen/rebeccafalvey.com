import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import PropTypes from 'prop-types';
import React from 'react';

import Content, { HTMLContent } from '../components/Content';
import Layout from '../components/Layout';
import PreviewCompatibleImage from '../components/PreviewCompatibleImage';

export const PageTemplate = ({ content, contentComponent, featuredImage, helmet, title }) => {
  const PageContent = contentComponent || Content;
  return (
    <article>
      {helmet || null}{' '}
      {featuredImage ? (
        <PreviewCompatibleImage
          imageInfo={{
            image: featuredImage,
            alt: `Featured image thumbnail for "${title}"`,
          }}
        />
      ) : null}{' '}
      <PageContent content={content} />
    </article>
  );
};

PageTemplate.propTypes = {
  content: PropTypes.node.isRequired,
  contentComponent: PropTypes.func,
  featuredImage: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  helmet: PropTypes.object,
  title: PropTypes.string,
};

const Page = ({ data }) => {
  const { markdownRemark: page } = data;
  return (
    <Layout>
      <>
        <PageTemplate
          content={page.html}
          contentComponent={HTMLContent}
          featuredImage={page.frontmatter.featuredImage}
          helmet={
            <Helmet>
              <title>{page.frontmatter.title}</title>
              <meta name="description" content={`${page.frontmatter.description}`} />
            </Helmet>
          }
          title={page.frontmatter.title}
        />
      </>
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
            fluid(maxWidth: 120, quality: 100) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`;
