import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';

import App from './App';
import Button from './components/Button';
import i18n from './i18n';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';

toast.configure();

ReactDOM.render(<App />, document.getElementById('root'));

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorkerRegistration.register({
  onUpdate: (swr) =>
    toast(
      <Button
        active
        onClick={() => swr.unregister().then(() => window.location.reload())}
      >
        {i18n.t('offline.update')}
      </Button>,
      { autoClose: false, type: toast.TYPE.INFO },
    ),
  onSuccess: () =>
    toast(i18n.t('offline.success'), { type: toast.TYPE.SUCCESS }),
});
