import PropTypes from 'prop-types';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Tab } from 'semantic-ui-react';
import GeneralTab from './GeneralTab';
import AssociationsTab from './AssociationsTab';
import Site from './Site';

function LuForestTypeDescription({ data }) {
  const { t } = useTranslation();
  return (
    <>
      <Tab
        panes={[
          {
            menuItem: t('lu.forestTypeDiagram.general'),
            render: () => <GeneralTab data={data} />,
          },
          {
            menuItem: t('lu.forestTypeDiagram.associations'),
            render: () => (
              <AssociationsTab
                associationGroupCode={data.associationGroupCode}
              />
            ),
          },
          {
            menuItem: t('forestTypeDiagram.terrain'),
            render: () => <Site data={data.expoAndAspect} />,
          },
        ]}
      />
    </>
  );
}

LuForestTypeDescription.propTypes = {
  data: PropTypes.shape().isRequired,
};

export default LuForestTypeDescription;
