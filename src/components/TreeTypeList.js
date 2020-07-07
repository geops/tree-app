import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
// eslint-disable-next-line import/no-unresolved
import { info } from 'lib/src';

function TreeTypeList({ className, codes }) {
  const { i18n } = useTranslation();
  return (
    <span className={className}>
      {codes.map((code) => {
        const treeInfo = info('treeType', code);
        return (
          <>
            {treeInfo[i18n.language]}
            {(treeInfo.endangered || treeInfo.pioneer) && (
              <sup>
                {(treeInfo.endangered && '✝') || (treeInfo.pioneer && '*')}
              </sup>
            )}{' '}
          </>
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
