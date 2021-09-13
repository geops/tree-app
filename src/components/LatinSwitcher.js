import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';

import { setLatinActive } from '../store/actions';

function LatinSwitcher({ className = '' }) {
  const dispatch = useDispatch();
  const latinActive = useSelector((state) => state.latinActive);
  const { t } = useTranslation();
  return (
    <Checkbox
      checked={latinActive}
      className={className}
      label={t('app.latinActive')}
      onClick={() => dispatch(setLatinActive(!latinActive))}
    />
  );
}

LatinSwitcher.propTypes = {
  className: PropTypes.string,
};

LatinSwitcher.defaultProps = {
  className: '',
};

export default LatinSwitcher;
