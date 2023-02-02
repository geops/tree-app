import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMatomo } from '@datapunt/matomo-tracker-react';

function MatomoTracker() {
  const { trackPageView, pushInstruction } = useMatomo();
  const consentGiven = useSelector((state) => state.consentGiven);
  const disableCookies = useSelector((state) => state.disableCookies);

  // Start tracking page view when the consent has been given
  useEffect(() => {
    if (!trackPageView || !pushInstruction || !consentGiven) {
      return;
    }
    pushInstruction('setConsentGiven');
    if (disableCookies) {
      pushInstruction('disableCookies');
    }
    trackPageView();
  }, [consentGiven, trackPageView, pushInstruction, disableCookies]);

  return null;
}

export default React.memo(MatomoTracker);
