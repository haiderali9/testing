import {SERVER_URL} from '@app/constants/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const getUserIp = async () => {
    const {data} = await axios.get('https://geolocation-db.com/json/');
    return data.IPv4;
};

const collectApi = async (userId, requestId) => {
    const payload = {userId, requestId};
    const {data} = await axios.post(`${SERVER_URL}/collectLogin`, payload);
    if (data.token) {
        return data.token;
    }
    if (data.code) {
        throw data.message;
    } else if (data.response.status === 'Pending') {
        return collectApi(userId, requestId);
    }

    return data;
};

export const login = createAsyncThunk('LOGIN_USER', async (formData) => {
    const {data} = await axios.post(`${SERVER_URL}/login`, formData);
    return data;
});
export const logout = createAsyncThunk('LOGOUT_USER', async () => {
    const response = await axios.get(`${SERVER_URL}/logout`);
    return response;
});

export const meraidLogin = createAsyncThunk(
    'MERAID_LOGIN',
    async (formData) => {
        const endUserIp = await getUserIp();
        const payload = {...formData, endUserIp};
        const {data} = await axios.post(`${SERVER_URL}/collectLogin`, payload);
        if (data.code) {
            throw data.message;
        }
        const {requestId} = data;
        const response = await collectApi(formData.userId, requestId);

        return response;
    }
);
