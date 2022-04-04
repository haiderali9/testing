import {SERVER_URL} from '@app/constants/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const registerApplication = createAsyncThunk(
    'REGISTER_APPLICATION',
    async (obj) => {
        const {data} = await axios.post(`${SERVER_URL}/registerApp`, obj);
        if (data.code) {
            throw data.message;
        } else {
            return data.message;
        }
    }
);

export const getRpApplications = createAsyncThunk(
    'GET_RP_APPLICATIONS',
    async (obj) => {
        const {data} = await axios.post(`${SERVER_URL}/getApps`, obj);
        if (data.code) {
            throw data.message;
        } else {
            return data.apps;
        }
    }
);

export const removeRpApplication = createAsyncThunk(
    'REMOVE_RP_APPLICATION',
    async (obj) => {
        const {data} = await axios.post(`${SERVER_URL}/deleteApp`, obj);
        if (data.code) {
            throw data.message;
        } else {
            return data.message;
        }
    }
);

export const generateApplicationToken = createAsyncThunk(
    'GENERATE_APPLICATION_TOKEN',
    async (obj) => {
        const {data} = await axios.post(`${SERVER_URL}/getToken`, obj);
        if (data.code) {
            throw data.message;
        } else {
            return data.data.token;
        }
    }
);

export const getApplicationTokens = createAsyncThunk(
    'GET_APPLICATION_TOKENS',
    async (obj) => {
        const {data} = await axios.post(`${SERVER_URL}/tokens`, obj);
        if (data.code) {
            throw data.message;
        } else {
            return data.tokens;
        }
    }
);

export const removeApplicationToken = createAsyncThunk(
    'REMOVE_APPLICATION_TOKEN',
    async (obj) => {
        const {data} = await axios.post(`${SERVER_URL}/deleteToken`, obj);
        if (data.code) {
            throw data.message;
        } else {
            return data.message;
        }
    }
);
