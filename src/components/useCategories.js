import { graphql, useStaticQuery } from 'gatsby';

const useCategories = () => {
  const {
    allMarkdownRemark: { edges: pages },
  } = useStaticQuery(
    graphql`
      {
        allMarkdownRemark(limit: 1000) {
          edges {
            node {
              frontmatter {
                categories
              }
            }
          }
        }
      }
    `
  );
  const categories = new Set();
  pages.forEach((page) => {
    if (page.node.frontmatter.categories) {
      page.node.frontmatter.categories.forEach(categories.add.bind(categories));
    }
  });
  return categories;
};

export default useCategories;
