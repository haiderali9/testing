import axios from 'axios';
import {store} from '@store/store';
import {logout} from '@app/store/reducers/auth.thunk';

export const interceptors = () => {
    axios.interceptors.request.use(
        (request) => {
            const {token} = store.getState().auth;
            if (token) {
                request.headers.Authorization = `Bearer ${token}`;
            }
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
};
