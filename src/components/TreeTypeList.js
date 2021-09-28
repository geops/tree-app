import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import { info } from '@geops/tree-lib';

function TreeTypeList({ className, codes }) {
  const latinActive = useSelector((state) => state.latinActive);
  const { i18n } = useTranslation();
  return (
    <span className={className}>
      {codes.map((code) => {
        const treeInfo = info('treeType', code);
        return (
          <React.Fragment key={code}>
            {treeInfo[latinActive ? 'la' : i18n.language]}
            <sup>
              {treeInfo.endangered && '†'}
              {treeInfo.nonresident && '°'}
              {treeInfo.pioneer && '*'}
            </sup>{' '}
          </React.Fragment>
        );
      })}
    </span>
  );
}

TreeTypeList.propTypes = {
  className: PropTypes.string,
  codes: PropTypes.arrayOf(PropTypes.number).isRequired,
};

TreeTypeList.defaultProps = {
  className: null,
};

export default TreeTypeList;
