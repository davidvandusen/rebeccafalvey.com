import { graphql } from 'gatsby';
import { Helmet } from 'react-helmet';
import React from 'react';

import { HTMLContent } from '../components/Content';
import Layout from '../components/Layout';
import { PageTemplate } from './Page';

const Category = (props) => {
  const pages = props.data.allMarkdownRemark.edges;
  const category = props.pageContext.category;
  const title = props.data.site.siteMetadata.title;
  return (
    <Layout>
      <section>
        <Helmet title={`${category} - ${title}`} />
        <h1>{category}</h1>
        {pages.map(({ node: page }) => (
          <PageTemplate
            key={page.fields.slug}
            content={page.html}
            contentComponent={HTMLContent}
            featuredImage={page.frontmatter.featuredImage}
            title={page.frontmatter.title}
          />
        ))}
      </section>
    </Layout>
  );
};

export default Category;

export const categoryQuery = graphql`
  query CategoryQuery($category: String) {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(
      limit: 1000
      sort: { fields: [frontmatter___date], order: DESC }
      filter: { frontmatter: { categories: { in: [$category] } } }
    ) {
      edges {
        node {
          html
          fields {
            slug
          }
          frontmatter {
            title
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
    }
  }
`;
