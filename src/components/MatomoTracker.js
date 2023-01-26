import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMatomo } from '@datapunt/matomo-tracker-react';

function MatomoTracker() {
  const { trackPageView, pushInstruction } = useMatomo();
  const consentGiven = useSelector((state) => state.consentGiven);

  // Start tracking page view when the consent has been given
  useEffect(() => {
    if (!trackPageView || !pushInstruction || !consentGiven) {
      return;
    }

    pushInstruction('setConsentGiven');
    trackPageView();
  }, [consentGiven, trackPageView, pushInstruction]);

  return null;
}

export default React.memo(MatomoTracker);
