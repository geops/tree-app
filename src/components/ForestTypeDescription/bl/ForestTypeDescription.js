import React, { useState } from 'react';
import PropTypes from 'prop-types';
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
  const { t } = useTranslation();
  const comparison = useSelector((state) => state.forestTypeComparison) || [];
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className={styles.buttons}>
        <Button
          active
          onClick={() =>
            dispatch(
              setForestTypeComparison([...new Set([...comparison, data.code])]),
            )
          }
        >
          {t('forestTypeModal.compare')}
        </Button>
      </div>
      <Divider hidden />
      <Tab
        activeIndex={activeTab}
        onTabChange={(evt, tab) => setActiveTab(tab.activeIndex)}
        menu={{ className: styles.pane, attached: true, tabular: true }}
        panes={[
          {
            key: 'Standortstyp',
            menuItem: 'Standortstyp',
            render: () => <GeneralTab data={data} />,
          },
          {
            menuItem: {
              key: 'Gesellschaftsgruppen',
              content: 'Gesellschaftsgruppen',
            },
            render: () => (
              <AssociationsTab
                onForestTypeChange={() => setActiveTab(0)}
                forestTypeCode={data.code}
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
