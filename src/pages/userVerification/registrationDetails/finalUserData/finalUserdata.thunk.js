import {SERVER_URL} from '@app/constants/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const updateUserStatus = createAsyncThunk(
    'UPDATE_REGISTRATION_STATUS',
    async (obj) => {
        const {data} = await axios.post(
            `${SERVER_URL}/handleRegistration`,
            obj
        );
        if (data.code) {
            throw data.message;
        } else {
            return data.data;
        }
    }
);

export const getServerRegistration = createAsyncThunk(
    'GET_SERVER_REGISTRATION',
    async (obj) => {
        const {data} = await axios.post(`${SERVER_URL}/getReg`, obj);
        if (data.code) {
            throw data.message;
        } else {
            return data.data;
        }
    }
);
