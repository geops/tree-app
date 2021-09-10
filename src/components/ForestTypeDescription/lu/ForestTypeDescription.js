import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tab } from 'semantic-ui-react';
import GeneralTab from './GeneralTab';
import AssociationsTab from './AssociationsTab';
import styles from '../ForestTypeDescription.module.css';

function ForestTypeDescription({ data }) {
  const { t } = useTranslation();
  return (
    <Tab
      menu={{ className: styles.pane, attached: true, tabular: true }}
      panes={[
        {
          menuItem: t('lu.forestType.general'),
          render: () => <GeneralTab data={data} />,
        },
        {
          menuItem: t('lu.forestType.associations'),
          render: () => (
            <AssociationsTab associationGroupCode={data.associationGroupCode} />
          ),
        },
      ]}
    />
  );
}

ForestTypeDescription.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default ForestTypeDescription;
