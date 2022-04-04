import {SERVER_URL} from '@app/constants/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getOpenRegistrations = createAsyncThunk(
    'GET_OPEN_REGISTRATIONS',
    async () => {
        const {data} = await axios.get(`${SERVER_URL}/getUserProfiles`);
        if (data.code) {
            throw data.message;
        } else {
            return data.data.filter((registration) => {
                return !registration.csr.id;
            });
        }
    }
);

export const switchRegistrationAssignment = createAsyncThunk(
    'SWITCH_REGISTRATION_ASSIGNMENT',
    async (obj) => {
        const {data} = await axios.post(`${SERVER_URL}/switchAssignment`, obj);
        if (data.code) {
            throw data.message;
        } else {
            return data.data;
        }
    }
);
