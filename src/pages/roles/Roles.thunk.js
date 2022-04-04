import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {SERVER_URL} from '../../constants/index';
import {
    CREATE_ROLE,
    DELETE_ROLE,
    EDIT_ROLE,
    GET_ROLES
} from './createRole/CreateRole.constant';

export const createRole = createAsyncThunk(CREATE_ROLE, async (obj) => {
    const {data} = await axios.post(`${SERVER_URL}/roles`, obj);
    return data;
});

export const getRoles = createAsyncThunk(GET_ROLES, async () => {
    const {data} = await axios.get(`${SERVER_URL}/roles`);
    return data;
});

export const deleteRole = createAsyncThunk(DELETE_ROLE, async (roleId) => {
    const {data} = await axios.delete(`${SERVER_URL}/roles`, {data: roleId});
    return data;
});

export const editRole = createAsyncThunk(EDIT_ROLE, async (obj) => {
    const {data} = await axios.patch(`${SERVER_URL}/roles`, obj);
    return data;
});
