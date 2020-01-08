import React from 'react';
import ReactDOM from 'react-dom';
import { toast } from 'react-toastify';

import App from './App';
import i18n from './i18n';
import * as serviceWorker from './serviceWorker';

import 'react-toastify/dist/ReactToastify.css';
import 'semantic-ui-css/semantic.min.css';

toast.configure();

ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
  onUpdate: () => toast(i18n.t('offline.update'), { type: toast.TYPE.INFO }),
  onSuccess: () => toast(i18n.t('offline.success'), { type: toast.TYPE.INFO }),
});
