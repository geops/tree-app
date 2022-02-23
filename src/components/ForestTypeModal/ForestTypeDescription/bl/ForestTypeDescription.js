import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Tab } from 'semantic-ui-react';

import Button from '../../../Button';
import GeneralTab from './GeneralTab';
import AssociationsTab from './AssociationsTab';
import ExportButton from '../../../ExportButton';

import { exportLocation } from '../../../../utils/docx/bl/exportLocation';

import { getComparisonForestTypes } from '../../../../utils/comparisonUtils';
import { setForestTypeComparison } from '../../../../store/actions';

import styles from '../ForestTypeDescription.module.css';

function ForestTypeDescription({ data }) {
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const comparison = useSelector((state) => state.forestTypeComparison) || [];
  const [activeTab, setActiveTab] = useState(0);

  const exportDocx = useCallback(
    () => exportLocation(data, i18n.language, t),
    [i18n.language, t, data],
  );

  return (
    <>
      <div className={styles.buttons}>
        <Button
          active
          onClick={() =>
            dispatch(
              setForestTypeComparison(
                getComparisonForestTypes(comparison, data.code),
              ),
            )
          }
        >
          {t('forestTypeModal.compare')}
        </Button>
        <ExportButton onClick={exportDocx} />
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
