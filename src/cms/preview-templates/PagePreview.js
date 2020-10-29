import React from 'react';
import PropTypes from 'prop-types';
import { PageTemplate } from '../../templates/Page';

const PagePreview = ({ entry, getAsset, widgetFor }) => (
  <PageTemplate
    content={widgetFor('body')}
    featuredImage={getAsset(entry.getIn(['data', 'featuredImage']))}
    title={entry.getIn(['data', 'title'])}
  />
);

PagePreview.propTypes = {
  entry: PropTypes.shape({
    getIn: PropTypes.func,
  }),
  getAsset: PropTypes.func,
  widgetFor: PropTypes.func,
};

export default PagePreview;
