import React, { useCallback, useState } from 'react';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Divider, Tab } from 'semantic-ui-react';

import Button from '../../../Button';
import GeneralTab from './GeneralTab';
import AssociationsTab from './AssociationsTab';
import ExportButton from '../../../ExportButton';

import { exportLocation } from '../../../../utils/docx/lu/exportLocation';
import { getComparisonForestTypes } from '../../../../utils/comparisonUtils';
import { setForestTypeComparison } from '../../../../store/actions';

import styles from '../ForestTypeDescription.module.css';

function ForestTypeDescription({ data }) {
  const dispatch = useDispatch();
  const comparison = useSelector((state) => state.forestTypeComparison) || [];
  const { t, i18n } = useTranslation();
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
        <ExportButton onClick={exportDocx}>
          {t('export.exportForestTypeDescription')}
        </ExportButton>
      </div>
      <Divider hidden />
      <Tab
        activeIndex={activeTab}
        onTabChange={(evt, tab) => setActiveTab(tab.activeIndex)}
        menu={{ className: styles.pane, attached: true, tabular: true }}
        panes={[
          {
            key: t('forestType.label'),
            menuItem: t('forestType.label'),
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
                onForestTypeChange={() => setActiveTab(0)}
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
