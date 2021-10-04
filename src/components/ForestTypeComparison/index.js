import PropTypes from 'prop-types';
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Form } from 'semantic-ui-react';

import Dropdown from '../Dropdown';
import ChForestTypeComparison from './ch';
import LuForestTypeComparison from './lu';

import { setForestTypeCompare } from '../../store/actions';

function ForestTypeComparison({ info, compare, options }) {
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const activeProfile = useSelector((state) => state.activeProfile);
  const forestTypeCompare = useSelector((state) => state.forestTypeCompare);

  return (
    <>
      <Form>
        <Dropdown
          label={t('forestTypeModal.compare')}
          multiple
          options={options}
          onChange={(e, { value }) => dispatch(setForestTypeCompare(value))}
          value={forestTypeCompare}
        />
      </Form>
      <br />
      {activeProfile === 'ch' && (
        <ChForestTypeComparison data={info} compare={compare} />
      )}
      {activeProfile === 'lu' && (
        <LuForestTypeComparison data={info} compare={compare} />
      )}
    </>
  );
}

ForestTypeComparison.propTypes = {
  info: PropTypes.shape().isRequired,
  options: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  compare: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default ForestTypeComparison;
