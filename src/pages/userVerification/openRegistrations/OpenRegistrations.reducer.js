import {createSlice} from '@reduxjs/toolkit';
import {
    getOpenRegistrations,
    switchRegistrationAssignment
} from './OpenRegistrations.thunk';

const initialState = {
    error: null,
    loading: false,
    successMessage: null,
    registrations: null
};

export const OpenRegistrationSlice = createSlice({
    name: 'openRegistration',
    initialState,
    reducers: {
        resetMessageState: (state) => {
            state.error = null;
            state.successMessage = null;
        }
    },
    extraReducers: {
        [getOpenRegistrations.pending]: (state) => {
            state.loading = true;
        },
        [getOpenRegistrations.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.registrations = payload;
        },
        [getOpenRegistrations.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        },
        [switchRegistrationAssignment.pending]: (state) => {
            state.loading = true;
        },
        [switchRegistrationAssignment.fulfilled]: (state, {payload}) => {
            state.loading = false;
            state.successMessage = payload;
        },
        [switchRegistrationAssignment.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.error.message;
        }
    }
});

export default OpenRegistrationSlice.reducer;

export const {resetMessageState} = OpenRegistrationSlice.actions;
