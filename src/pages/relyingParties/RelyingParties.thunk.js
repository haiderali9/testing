import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {mapKeys} from 'lodash';
import {SERVER_URL} from '../../constants/index';
import {
    BLOCK_PARTY,
    GET_PARTIES_LIST,
    UNBLOCK_RELYING_PARTY,
    CREATE_RELYING_PARTY,
    BLOCKED_PARTIES,
    UPDATE_PARTY
} from './relyingPartiesList/RelyingParties.constant';

export const getRelyingParties = createAsyncThunk(
    GET_PARTIES_LIST,
    async () => {
        const {data} = await axios.post(`${SERVER_URL}/list-rp`, {});
        return mapKeys(data.result, 'rpId');
    }
);
export const getBlockedParties = createAsyncThunk(BLOCKED_PARTIES, async () => {
    const {data} = await axios.post(`${SERVER_URL}/list-rp`, {
        status: 'blocked'
    });
    return mapKeys(data.result, 'rpId');
});

export const registerRelyingParty = createAsyncThunk(
    CREATE_RELYING_PARTY,
    async (relyingParty) => {
        const {data} = await axios.post(
            `${SERVER_URL}/register-rp`,
            relyingParty
        );
        return data;
    }
);

export const updateRelyingParty = createAsyncThunk(
    UPDATE_PARTY,
    async (relyingParty) => {
        const {data} = await axios.post(
            `${SERVER_URL}/update-rp`,
            relyingParty
        );
        return data;
    }
);

export const blockRelyingParty = createAsyncThunk(BLOCK_PARTY, async (obj) => {
    const {data} = await axios.post(`${SERVER_URL}/update-rp`, obj);
    return data;
});
export const unBlockRelyingParty = createAsyncThunk(
    UNBLOCK_RELYING_PARTY,
    async (obj) => {
        const {data} = await axios.post(`${SERVER_URL}/update-rp`, obj);
        return data;
    }
);
