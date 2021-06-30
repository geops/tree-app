import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tab } from 'semantic-ui-react';
import GeneralTab from './GeneralTab';
import AssociationsTab from './AssociationsTab';

function LuForestTypeDescription({ data }) {
  const { t } = useTranslation();
  return (
    <>
      <Tab
        panes={[
          {
            menuItem: t('forestTypeDiagram.general'),
            render: () => <GeneralTab data={data} />,
          },
          {
            menuItem: t('forestTypeDiagram.associations'),
            render: () => <AssociationsTab data={data} />,
          },
          //   {
          //     menuItem: t('forestTypeDiagram.soil.header'),
          //     render: () => <SoilTab data={data} />,
          //   },
        ]}
      />
    </>
  );
}

LuForestTypeDescription.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default LuForestTypeDescription;
