import {SERVER_URL} from '@app/constants/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getAssignedRegistrations = createAsyncThunk(
    'GET_ASSIGNED_REGISTRATIONS',
    async () => {
        const {data} = await axios.get(`${SERVER_URL}/getUserProfiles`);
        if (data.code) {
            throw data.message;
        } else {
            return data.data;
        }
    }
);
