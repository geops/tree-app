import { translate } from '@geops/tree-lib';
import React from 'react';
import { List } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function RecommendationTreeList({ className, recommendationTreeList }) {
  const { i18n } = useTranslation();
  return (
    <List className={className}>
      {recommendationTreeList.map(r => (
        <List.Item key={r}>{translate('treeType', r, i18n.language)}</List.Item>
      ))}
    </List>
  );
}

RecommendationTreeList.propTypes = {
  className: PropTypes.string.isRequired,
  recommendationTreeList: PropTypes.arrayOf(PropTypes.string),
};

RecommendationTreeList.defaultProps = {
  recommendationTreeList: [],
};

export default RecommendationTreeList;
