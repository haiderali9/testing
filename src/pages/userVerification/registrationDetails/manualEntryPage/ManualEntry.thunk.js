import {SERVER_URL} from '@app/constants/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const updateRegistration = createAsyncThunk(
    'UPDATE_REGISTRATION',
    async (obj) => {
        const {data} = await axios.put(`${SERVER_URL}/updateRegApp`, {
            ...obj,
            useCase: 'manualEntry'
        });
        if (data.code) {
            throw data.message;
        } else {
            return data.data;
        }
    }
);

export const getServerAssets = createAsyncThunk(
    'GET_SERVER_ASSETS',
    async (obj) => {
        const {data} = await axios.post(`${SERVER_URL}/getReg`, obj);
        if (data.code) {
            throw data.message;
        } else {
            return data.data.finalApplication;
        }
    }
);
