const _ = require('lodash');
const path = require('path');
const { createFilePath } = require('gatsby-source-filesystem');
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

exports.createPages = async ({ actions: { createPage }, graphql }) => {
  const result = await graphql(`
    {
      allMarkdownRemark(limit: 1000) {
        edges {
          node {
            id
            fields {
              slug
            }
            frontmatter {
              categories
            }
          }
        }
      }
    }
  `);
  if (result.errors) {
    result.errors.forEach((e) => console.error(e.toString()));
    return Promise.reject(result.errors);
  }
  const pages = result.data.allMarkdownRemark.edges;
  pages.forEach((page) => {
    createPage({
      path: page.node.fields.slug,
      categories: page.node.frontmatter.categories,
      component: path.resolve(`src/templates/Page.js`),
      context: {
        id: page.node.id,
      },
    });
  });
  const categories = new Set();
  pages.forEach((page) => {
    if (page.node.frontmatter.categories) {
      page.node.frontmatter.categories.forEach(categories.add.bind(categories));
    }
  });
  categories.forEach((category) => {
    createPage({
      path: `/${_.kebabCase(category)}/`,
      component: path.resolve(`src/templates/Category.js`),
      context: {
        category,
      },
    });
  });
};

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;
  // convert image paths for gatsby images
  fmImagesToRelative(node);
  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value,
    });
  }
};
