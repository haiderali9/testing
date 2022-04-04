import axios from 'axios';
import store from '@store/store';
import {logout} from '@app/store/reducers/auth.thunk';

axios.defaults.baseURL = `${process.env.REACT_APP_SERVER_URL}`;
axios.defaults.timeout = 10000;
axios.defaults.headers.get.Accept = 'application/json';
axios.defaults.headers.post.Accept = 'application/json';
axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.post['Access-Control-Allow-Origin'] = '*';

axios.interceptors.request.use(
    (request) => {
        return request;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response.data.status === 401) {
            store.dispatch(logout());
        }
        return Promise.reject(error);
    }
);
