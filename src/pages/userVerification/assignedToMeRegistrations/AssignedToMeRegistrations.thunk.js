import {SERVER_URL} from '@app/constants/index';
import {createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const getAssignedToMeRegistrations = createAsyncThunk(
    'GET_ASSIGNED_TO_ME_REGISTRATIONS',
    async () => {
        const {data} = await axios.get(`${SERVER_URL}/assignedTickets`);
        if (data.code) {
            throw data.message;
        } else {
            return data.data.tickets;
        }
    }
);
