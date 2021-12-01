import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Tab } from 'semantic-ui-react';

import Button from '../../Button';
import GeneralTab from './GeneralTab';
import AssociationsTab from './AssociationsTab';
import styles from '../ForestTypeDescription.module.css';
import { setForestTypeComparison } from '../../../store/actions';

function ForestTypeDescription({ data }) {
  const dispatch = useDispatch();
  const comparison = useSelector((state) => state.forestTypeComparison) || [];
  const { t } = useTranslation();
  return (
    <>
      <Button
        compact
        active
        onClick={() =>
          dispatch(
            setForestTypeComparison([...new Set([...comparison, data.code])]),
          )
        }
      >
        {t('forestTypeModal.compare')}
      </Button>
      <Divider hidden />
      <Tab
        menu={{ className: styles.pane, attached: true, tabular: true }}
        panes={[
          {
            key: t('lu.forestType.general'),
            menuItem: t('lu.forestType.general'),
            render: () => <GeneralTab data={data} />,
          },
          {
            menuItem: {
              key: t('lu.forestType.associations'),
              content: t('lu.forestType.associations'),
              'data-cypress': 'forestTypeDescription.lu.associationsMenuItem',
            },
            render: () => (
              <AssociationsTab
                associationGroupCode={data.associationGroupCode}
              />
            ),
          },
        ]}
      />
    </>
  );
}

ForestTypeDescription.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default ForestTypeDescription;
