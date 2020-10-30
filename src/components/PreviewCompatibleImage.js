import Img from 'gatsby-image';
import PropTypes from 'prop-types';
import React from 'react';

const PreviewCompatibleImage = ({ imageInfo, ...props }) => {
  const { alt = '', childImageSharp, image } = imageInfo;
  if (image && image.childImageSharp) {
    return <Img alt={alt} fluid={image.childImageSharp.fluid} {...props} />;
  }
  if (childImageSharp) {
    return <Img alt={alt} fluid={childImageSharp.fluid} {...props} />;
  }
  if (typeof image === 'string' && image.length > 0) {
    return <img alt={alt} src={image} {...props} />;
  }
  return null;
};

PreviewCompatibleImage.propTypes = {
  imageInfo: PropTypes.shape({
    alt: PropTypes.string,
    childImageSharp: PropTypes.object,
    image: PropTypes.oneOfType([PropTypes.object, PropTypes.string]).isRequired,
  }).isRequired,
};

export default PreviewCompatibleImage;
