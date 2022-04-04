import {SERVER_URL} from '@app/constants/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getServerPhotos = createAsyncThunk(
    'GET_SERVER_PHOTOS',
    async (obj) => {
        const {data} = await axios.post(`${SERVER_URL}/getReg`, obj);

        if (data.code) {
            throw data.message;
        } else {
            return data.data;
        }
    }
);
