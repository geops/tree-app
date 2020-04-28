import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';

import App from './App';
import Button from './components/Button';
import i18n from './i18n';
import * as serviceWorker from './serviceWorker';

import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';

toast.configure();

ReactDOM.render(<App />, document.getElementById('root'));

// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onUpdate: (registration) =>
    toast(
      <Button
        active
        onClick={() =>
          registration.unregister().then(() => window.location.reload(true))
        }
      >
        {i18n.t('offline.update')}
      </Button>,
      { autoClose: false, type: toast.TYPE.INFO },
    ),
  onSuccess: () =>
    toast(i18n.t('offline.success'), { type: toast.TYPE.SUCCESS }),
});
