import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {mapKeys} from 'lodash';
import {SERVER_URL} from '../../constants/index';
import {
    CREATE_USER_ADMIN,
    GET_ADMINS,
    BLOCK_ADMIN,
    UNBLOCK_ADMIN
} from './createUser/CreateUser.constant';

export const createAdmin = createAsyncThunk(
    CREATE_USER_ADMIN,
    async (formData) => {
        const {data} = await axios.post(
            `${SERVER_URL}/register-admin`,
            formData
        );
        return data;
    }
);

export const getAdmins = createAsyncThunk(GET_ADMINS, async () => {
    const {data} = await axios.get(`${SERVER_URL}/getAllADUsers`, {});
    return mapKeys(data.data, 'userId');
});

export const blockAdmin = createAsyncThunk(BLOCK_ADMIN, async (obj) => {
    const {data} = await axios.patch(`${SERVER_URL}/updateStatus`, obj);
    return data;
});

export const unBlockAdmin = createAsyncThunk(UNBLOCK_ADMIN, async (obj) => {
    const {data} = await axios.patch(`${SERVER_URL}/updateStatus`, obj);
    return data;
});
