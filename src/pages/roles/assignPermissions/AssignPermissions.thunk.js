import {SERVER_URL} from '@app/constants/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getPermissions = createAsyncThunk('GET_PERMISSIONS', async () => {
    const {data} = await axios.get(`${SERVER_URL}/getAllAccessRights`);
    return data;
});

export const assignPermissions = createAsyncThunk(
    'ASSIGN_PERMISSIONS',
    async (obj) => {
        const {data} = await axios.post(`${SERVER_URL}/assignARs`, obj);
        return data;
    }
);
