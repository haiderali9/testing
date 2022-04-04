import 'react-app-polyfill/ie11';
import 'react-app-polyfill/stable';
import '@assets/styles/stylesheet.scss';

import './i18n';

import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {toast} from 'react-toastify';
import App from '@app/App';
import {persistor, store} from '@store/store';
import {PersistGate} from 'redux-persist/integration/react';
import * as serviceWorker from './serviceWorker';
import {interceptors} from './utils/axios';

interceptors();

toast.configure({
    autoClose: 3000,
    draggable: false,
    position: 'top-right',
    hideProgressBar: false,
    newestOnTop: true,
    closeOnClick: true,
    rtl: false,
    pauseOnVisibilityChange: true,
    pauseOnHover: true
});

ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
