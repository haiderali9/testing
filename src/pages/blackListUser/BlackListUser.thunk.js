import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import {SERVER_URL} from '../../constants/index';

export const blackListUser = createAsyncThunk(
    'BLACK_LIST_USER',
    async (obj) => {
        const {data} = await axios.post(`${SERVER_URL}/handleBlock`, obj);
        if (data.code) {
            throw data.message;
        } else {
            return data.message;
        }
    }
);
