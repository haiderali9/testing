import {SERVER_URL} from '@app/constants/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getAssignedToMeRegNumber = createAsyncThunk(
    'GET_ASSIGNED_TO_ME_REGISTRATION_NUMBERS',
    async () => {
        const {data} = await axios.get(`${SERVER_URL}/assignedTickets`);
        if (data.code) {
            throw data.message;
        } else {
            return data.data.tickets.length;
        }
    }
);

export const getOpenAssignedNumber = createAsyncThunk(
    'GET_OPEN_ASSIGNED_NUMBER',
    async () => {
        const {data} = await axios.get(`${SERVER_URL}/getUserProfiles`);
        if (data.code) {
            throw data.message;
        } else {
            return data.data;
        }
    }
);
