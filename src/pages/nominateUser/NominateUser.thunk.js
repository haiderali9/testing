import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {SERVER_URL} from '../../constants/index';

export const nominateUser = createAsyncThunk('NOMINATE_USER', async (obj) => {
    const {data} = await axios.post(`${SERVER_URL}/nominateUser`, obj);
    if (data.code) {
        throw data.message;
    } else {
        return data.message;
    }
});

export const getNominatedUsers = createAsyncThunk(
    'GET_NOMINATED_USERS',
    async (obj) => {
        const {data} = await axios.post(`${SERVER_URL}/getNominatedUsers`, obj);
        if (data.code) {
            throw data.message;
        } else {
            return data.data;
        }
    }
);

export const removeNominatedUser = createAsyncThunk(
    'REMOVE_NOMINATED_USER',
    async (obj) => {
        const {data} = await axios.post(`${SERVER_URL}/deNominateUser`, obj);
        if (data.code) {
            throw data.message;
        } else {
            return data.message;
        }
    }
);
