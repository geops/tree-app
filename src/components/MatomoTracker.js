import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMatomo } from '@datapunt/matomo-tracker-react';

const LS_MATOMO_USER_SESSION_TIMER = 'matomo_user_session_timer';
const LS_MATOMO_TOPIC_VISITED = 'matomo_topic_visited';

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

    // Start the clock to avoid duplicate 'User topic change' event tracking.
    localStorage?.setItem(LS_MATOMO_USER_SESSION_TIMER, Date.now());
    localStorage?.setItem(LS_MATOMO_TOPIC_VISITED, '');
  }, [consentGiven, trackPageView, pushInstruction]);

  return null;
}

export default React.memo(MatomoTracker);
