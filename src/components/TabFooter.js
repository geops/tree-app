import React, { useMemo } from 'react'
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';
import { info, utils } from '@geops/tree-lib';
import { useSelector } from 'react-redux';
import ExportButton from './ExportButton';
import styles from './ProjectionResult.module.css';

function TabFooter(props) {
    const { t } = useTranslation()
    const { onExport, forestType, scenario } = props;
    const activeProfile = useSelector((state) => state.activeProfile);
    const ftMapping = useMemo(() => {
        try {
          return utils().getMapping('forestTypes', activeProfile);
        } catch (error) {
          console.log(`No forest type mapping found for ${activeProfile}`, error);
          return null;
        }
    }, [activeProfile]);


    // const cantonalForestTypes = useMemo(() => {
    //     if (!ftMapping || !forestType) return [];
    //     const mappedFts = ftMapping[forestType];
    //     const forestTypes = mappedFts.reduce((allFts, ft) => {
    //       let ftInfo;
    //       try {
    //         ftInfo = info('forestType', ft, activeProfile);
    //         console.log('ftInfo', ftInfo);
    //         forestTypes.push(ftInfo);
    //       } catch (error) {
    //         console.log(`No forest type found for ${ft} in ${activeProfile}`, error);
    //       }
    //       try {
    //         ftInfo = info('forestType', ft);
    //         console.log('ftInfo', ftInfo);
    //         forestTypes.push(ftInfo);
    //       } catch (error) {
    //         console.log(`No forest type found for ${ft} in ch`, error);
    //       }
    //       return ftInfo ? [...allFts, ftInfo] : allFts
    //     }, [])
    //     return forestTypes;
    //   }, [forestType, ftMapping, activeProfile]);
    // console.log(cantonalForestTypes);

    // if (!onExport && !cantonalForestTypes?.length) return null

    return (
      <div className={styles.exportButtonWrapper}>
        {onExport && (
          <ExportButton
            onClick={onExport}
            className={`${styles.exportButton}`}
          >
            {t('export.exportRecommendation')}
          </ExportButton>
        )}
        {}
      </div>
    )
}

TabFooter.propTypes = {
  onExport: PropTypes.func,
  forestType: PropTypes.string,
  scenario: PropTypes.string,
}

TabFooter.defaultProps = {
    onExport: null,
    forestType: null,
    scenario: null,
}

export default TabFooter
